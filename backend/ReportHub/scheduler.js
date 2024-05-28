const cron = require('node-cron')
const mongoose = require('mongoose')
const {Assessment, Response} = require('library/index')

function generateReport(assessmentId)
{
    try
    {
        const assessment = new mongoose.Types.ObjectId(assessmentId)

        const participantPipeline = 
        [
            {
              $match: {
                _id: assessment,
              },
            },
            { $project: { participants: 1 } },
            {
              $lookup: {
                from: "sections",
                localField: "participants",
                foreignField: "_id",
                pipeline: [
                  {
                    $project: { roster: 1, sectionName: 1 },
                  },
                ],
                as: "participants",
              },
            },
            { $unwind: "$participants" },
            {
              $lookup: {
                from: "users",
                localField: "participants.roster",
                foreignField: "_id",
                pipeline: [
                  { $project: { name: 1, erp: 1 } },
                ],
                as: "student",
              },
            },
            { $unwind: "$student" },
            {
              $project: {
                student: 1,
                sectionName: "$participants.sectionName",
                sectionId: "$participants._id",
              },
            },
            {
              $lookup: {
                from: "responses",
                let: {
                  studentId: "$student._id",
                  assessmentId: "$_id",
                },
                pipeline: [
                  {
                    $match: 
                    {
                      $expr: {
                        $and: 
                        [
                          { $eq: ["$student","$$studentId"],},
                          {$eq: ["$assessment","$$assessmentId"]},
                        ],
                      },
                    },
                  },
                  { $project: { _id: 1, createdAt:1, submittedAt:1, totalScore: 1 } },
                ],
                as: "student.response",
              },
            },
            {
              $group: 
              {
                _id: "$sectionId",
                sectionName: { $first: "$sectionName" },
                responses: {
                  $sum: {$cond: [{ $ne: [{$size: "$student.response"}, 0] }, 1, 0]}
                },
                responseTime: 
                {
                  $avg: 
                  {
                    $cond: [
                      { $and: [{ $ne: [{$first: "$student.response.submittedAt"}, null] }, { $ne: [{$first:"$student.response.createdAt"}, null] }] },
                      { $divide: [{ $subtract: [{$first: "$student.response.submittedAt"}, {$first:"$student.response.createdAt"}] }, 1000] },
                      0,
                    ],
                  },
                },
                averageScore: {
                  $avg: {
                    $first: 
                    {
                      $ifNull: ["$student.response.totalScore", 0], 
                    },
                  },
                },
                highestScore: {
                  $max: {
                    $first: 
                    {
                      $ifNull: ["$student.response.totalScore", 0], 
                    },
                  },
                },
                students: {
                  $push: {
                    name: "$student.name",
                    erp: "$student.erp",
                    response: {
                      $first: "$student.response._id",
                    },
                  },
                },
              },
            },
            {
              $project: {
                sectionId: "$_id",
                sectionName: 1,
                responses: 1,
                responseTime: 1,
                averageScore: 1,
                highestScore: 1,
                students: 1
              }
            }
        ]
        const questionPipeline = 
        [
          {
            $match: { assessment },
          },
          {
            $project: {
              section: 1,
              responses: 1,
              _id: 0,
            },
          },
          { $unwind: "$responses" },
          {
            $lookup: {
              from: "questions",
              localField: "responses.questionId",
              foreignField: "_id",
              pipeline: [{ $project: { points: 1 } }],
              as: "question",
            },
          },
          { $unwind: "$question" },
          {
            $group: {
              _id: {
                section: "$section",
                question: "$question._id",
              },
              questions: {
                $push: {
                  question: "$question._id",
                  totalResponses: { $sum: 1 },
                  totalSkipped: {
                    $sum: {
                      $cond: [
                        {
                          $or: [
                            {
                              $eq: [
                                "$responses.answer",
                                null,
                              ],
                            },
                            {
                              $eq: [
                                {
                                  $size:
                                    "$responses.answer",
                                },
                                0,
                              ],
                            },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  totalCorrect: {
                    $sum: {
                      $cond: [
                        {
                          $eq: [
                            "$responses.score",
                            "$question.points",
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  averageResponseTime: {
                    $avg: "$responses.responseTime",
                  },
                  highestScore: {
                    $max: "$responses.score",
                  },
                  averageScore: {
                    $avg: "$responses.score",
                  },
                },
              },
            },
          },
          {
            $group: {
              _id: "$_id.section",
              questions: 
              {
                $push: 
                {  
                  question: {$first: "$questions.question"},
                  totalResponses: { $sum: '$questions.totalResponses' },
                  totalSkipped: { $sum: '$questions.totalSkipped' },
                  totalCorrect: { $sum: '$questions.totalCorrect' },
                  averageResponseTime: { $avg: '$questions.averageResponseTime' },
                  highestScore: { $max: '$questions.highestScore' },
                  averageScore: { $avg: '$questions.averageScore' }
                },
              },
            },
          },
        ]

        const participantSummary = Assessment.aggregate(participantPipeline)
        const questionSummary =  Response.aggregate(questionPipeline)

        Promise.all([questionSummary, participantSummary])
        .then(async results => 
        {
            const participants = results[1].map(participant => 
            {
                const questionsData = results[0].find(item => item._id.equals(participant.sectionId))

                let questions = []
                if(questionsData && questionsData.questions){questions = questionsData.questions}
                const { _id, students, ...rest } = participant
                return { ...rest, students, questions }
            })

            const summary = { participants , generated:  Date.now()}
            const updatedAssessment = await Assessment.findByIdAndUpdate
            (
                assessmentId, 
                {summary, status: 'Published'},
            )
            if (!updatedAssessment) {return res.status(404).json({error: 'ER_NOT_FOUND', message: 'Assessment not found'})}
        })
        .catch(error => 
        {
            console.log(error)
            throw new Error('Could not generate report')
        })  

    }
    catch(err){
        console.log(err)
    }
}

async function scheduleReportGeneration()
{

    let assessments = await Assessment.find
    ({
      'configurations.closeDate': { $lt: new Date() },
       status: { $ne: "Published" },
      'configurations.releaseGrades': true
    }).populate({
      path: 'questionBank.question', 
      select: 'type' 
    })

    assessments.forEach(async (assessment) => 
    {
      try
      {
        const hasShortAnswers = assessment.questionBank.some(item => item.question.type === 'Short Answer')
        if (hasShortAnswers && assessment.status != 'Reviewed') 
        {
          assessment.configurations.releaseGrades = false
          await assessment.save()
        } 
        else
        {
          console.log(`Generating report for assessment: ${assessment._id}`)
          generateReport(assessment._id)
        }
      }
      catch(err)
      {
        throw new Error(err.message)
      }
    })

    return assessments.length
}

cron.schedule('*/1 * * * *', async () => 
{
    console.log('Running assessment check...');
    try 
    {
        const reportsGenerated = await scheduleReportGeneration()
        console.log('Assessment check complete. ' + reportsGenerated + ' new report(s) generated')
    } catch (error) {
        console.error('Error in assessment check:', error);
    }
})