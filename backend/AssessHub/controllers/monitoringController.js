const mongoose = require('mongoose')
const {Assessment, Response} = require('library/index')


module.exports.getMonitoringDetails = async (req,res) => 
{
    try
    {
      const {assessmentId} = req.params

      const assessment = new mongoose.Types.ObjectId(assessmentId)

      const pipeline = 
      [
        { $match: { _id: assessment } },

        { $lookup: { from: 'sections', localField: 'participants', foreignField: '_id', as: 'participants' } },

        { $unwind: '$participants' },

        { $lookup: { from: 'users', localField: 'participants.roster', foreignField: '_id', as: 'students' } },

        { $unwind: '$students' },

        {
            $lookup: {
                from: 'responses',
                let: { studentId: '$students._id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ['$assessment', assessment] },
                                    { $eq: ['$student', '$$studentId'] }
                                ]
                            }
                        }
                    }
                ],
                as: 'response'
            }
        },

        {
          $addFields: {
              responseExists: { $ne: [{ $ifNull: ['$response', []] }, []] }
          }
        },

        {
            $project: {
                _id: 0,
                studentId: '$students._id',
                studentName: '$students.name',
                sectionName: '$participants.sectionName',
                score:
                {
                  $cond: {if: '$responseExists', then: { $arrayElemAt: ['$response.totalScore', 0] }, else: null}
                },
                startTime:
                {
                  $cond: {if: '$responseExists', then: { $arrayElemAt: ['$response.createdAt', 0] }, else: null}
                },
                submitTime:
                {
                  $cond: {if: '$responseExists', then: { $arrayElemAt: ['$response.submittedAt', 0] }, else: null}
                },
                status: 
                {
                  $cond: {if: '$responseExists', then: { $arrayElemAt: ['$response.status', 0] }, else: 'Not Started'}
                },
                flagged: 
                {
                  $cond: {
                    if: "$responseExists",
                    then: {
                      $cond: {
                        if: { $gt: [{ $size: {$arrayElemAt: ["$response.flaggings", 0]} }, 0] },
                        then: true,
                        else: false
                      }
                    },
                    else: false
                  }
                }
            }
        }
      ]
    
      const result = await Assessment.aggregate(pipeline)

      res.status(201).json({data: result})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get monitoring details' })
    }   
}
module.exports.flagCandidate = async (req,res) => 
  {
      try
      {
        const {responseId} = req.params
        const violations = req.body

        const updatedResponse = await Response.findByIdAndUpdate(responseId, { $addToSet: { 'flaggings': { $each: violations } }})
        if (!updatedResponse) {return res.status(404).json({error: 'ER_NOT_FOUND', message: 'Response not found'})}

        const updatedAssessment = await Assessment.findByIdAndUpdate(updatedResponse.assessment, {'configurations.releaseGrades': false})
        if(!updatedAssessment){return res.status(404).json({error: 'ER_NOT_FOUND', message: 'Assessment not found.'}) }
  
        return res.status(200).json({message: `Violations added successfully`})  
  
      }
      catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })}  if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to flag candidate' })
      }   
  }