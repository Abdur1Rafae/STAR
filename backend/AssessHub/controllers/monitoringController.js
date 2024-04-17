const mongoose = require('mongoose')
const {Assessment} = require('library/index')


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

        { $lookup: { from: 'students', localField: 'participants.roster', foreignField: '_id', as: 'students' } },

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
                  $cond: {if: '$responseExists', then: { $arrayElemAt: ['$response.monitoring.flagged', 0] }, else: false}
                }
            }
        }
      ]
    
      const result = await Assessment.aggregate(pipeline)

      res.status(201).json({data: result})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get questions' })
    }   
}