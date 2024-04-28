const mongoose = require('mongoose')
const {Assessment, Response} = require('library/index')


module.exports.getAllReports= async (req,res) => 
{
    try
    {
        const teacher = req.body.decodedToken.id

        const assessments = await Assessment.aggregate([
            { 
                $match: 
                { 
                    teacher: new mongoose.Types.ObjectId(teacher),
                    status: {$eq: 'Published'}
                } 
            },
            {
                $project: 
                {
                    _id: 1,
                    title: 1,
                    class: 1,
                    responses: {$sum: '$summary.participants.responses'},
                    generated: '$summary.generated'
                }
            }
        ])

        res.status(201).json({data: assessments})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to generate question report'})
    }
}
module.exports.getReportOverview= async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params

        const assessment = await Assessment.findById(assessmentId)
        .select('summary questionBank totalMarks -_id')
        .populate
        ({
            path: 'summary.participants.students.response',
            select: 'totalScore submittedAt createdAt',
        })
        .populate
        ({
            path: 'questionBank.question',
            select: '-__v -teacher',
        })

        if (!assessment){return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Assessment not found' })}

        res.status(201).json({data: assessment})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to generate question report'})
    }
}
module.exports.getIndividualResponse= async (req,res) => 
{
    try
    {
        const {responseId} = req.params

        let response = await Response.findById(responseId)
        .select('assessment section responses totalScore previousScore student')
        .populate
        ({
            path:'section',
            select: 'assessments',
            populate:
            {
                path: 'assessments',
                select: 'createdAt status',
                model: Assessment
            
            }
        })

        if (!response){return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Response not found' })}

        let previousScore = response.previousScore
        let previousTotal = response.previousTotal

        if(!previousScore)
        {
            const student = response.student
            const section = response.section
            const assessment = response.assessment

            previousAssessment = await Response.aggregate
            ([
                {
                  $match: 
                  {
                    section: new mongoose.Types.ObjectId(section),
                    student: new mongoose.Types.ObjectId(student),
                    assessment: { $ne: new mongoose.Types.ObjectId(assessment) }
                  }
                },
                {
                  $lookup: 
                  {
                    from: "assessments",
                    localField: "assessment",
                    foreignField: "_id",
                    pipeline:[{$project: {status: 1, 'totalMarks': 1}}],
                    as: "assessment"
                  }
                },
                {$unwind: '$assessment'},
                {
                  $match: {
                    _id: { $lt: new mongoose.Types.ObjectId(assessment)},
                    "assessment.status": "Published"
                  }
                },
                {
                  $project: {
                    totalScore: '$totalScore',
                    totalMarks: '$assessment.totalMarks'
                  }
                }
              ]);
           
            previousScore = previousAssessment.length > 0 ? previousAssessment[0].totalScore : null
            previousTotal = previousAssessment.length > 0 ? previousAssessment[0].totalMarks : null

            response.previousScore = previousScore
            response.previousTotal = previousTotal
            response.save()      
        }

        res.status(201).json({data: {responses: response.responses, previousScore: previousScore || null, previousTotal: previousTotal || null}})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to generate question report'})
    }
}


/*
 // let previousAssessment = null

            // const currentIndex = response.section.assessments.findIndex(assessment => assessment._id.toString() === response.assessment.toString())
            // for (let i = currentIndex - 1; i >= 0; i--) {
            //     if (response.section.assessments[i].status === 'Published') {
            //         previousAssessment = response.section.assessments[i]
            //         break;
            //     }
            // }

            // if(previousAssessment!=null)
            // {
            //     const previousResponse = await Response.findOne
            //     ({
            //         assessment: new mongoose.Types.ObjectId(previousAssessment._id),
            //         student: new mongoose.Types.ObjectId(student)
            //     }).select('totalScore')

*/

// const pipelineTopicBreakDown = 
// [
//     {
//         $match: {assessment}
//     },
//     { $unwind: '$responses' },
//     {
//         $lookup: 
//         {
//             from: 'questions',
//             localField: 'responses.questionId',
//             foreignField: '_id',
//             as: 'question'
//         }
//     },
//     { $unwind: '$question' },
//     {
//         $group: 
//         {
//             _id: '$question.topic',
//             totalResponses: { $sum: 1 },
//             totalCorrect: { $sum: { $cond: [{ $eq: ['$responses.score', '$question.points'] }, 1, 0] } }
//         }
//     },
//     {
//         $project: 
//         {
//             _id: 0,
//             topic: '$_id', 
//             percentage: { $multiply: [{ $divide: ['$totalCorrect', '$totalResponses'] }, 100] }
//         }
//     }
// ]
// const pipelineParticipants = 
// [
//   { $match: { _id: new mongoose.Types.ObjectId(assessment) } },

//   { $lookup: { from: 'sections', localField: 'participants', foreignField: '_id', as: 'participants' } },

//   { $unwind: '$participants' },

//   { $lookup: { from: 'students', localField: 'participants.roster', foreignField: '_id', as: 'students' } },

//   { $unwind: '$students' },

//   {
//       $lookup: {
//           from: 'responses',
//           let: { studentId: '$students._id' },
//           pipeline: [
//               {
//                   $match: {
//                       $expr: {
//                           $and: [
//                               { $eq: ['$assessment', assessment] },
//                               { $eq: ['$student', '$$studentId'] }
//                           ]
//                       }
//                   }
//               }
//           ],
//           as: 'response'
//       }
//   },

//   {
//     $addFields: {
//         responseExists: { $ne: [{ $ifNull: ['$response', []] }, []] }
//     }
//   },

//   {
//       $project: 
//       {
//         _id: 0,
//         _id: '$students._id',
//         studentName: '$students.name',
//         sectionName: '$participants.sectionName',
//         submitTime:
//         {
//         $cond: {if: '$responseExists', then: { $arrayElemAt: ['$response.submittedAt', 0] }, else: null}
//         },
//         responseTime: {
//             $cond: {
//                 if: '$responseExists',
//                 then: {$divide: [{ $subtract: [{ $arrayElemAt: ['$response.submittedAt', 0] }, { $arrayElemAt: ['$response.createdAt', 0] }] }, 1000]},
//                 else: null
//             }
//         },        
//         score: 
//         {
//         $cond: {if: '$responseExists', then: { $arrayElemAt: ['$response.totalScore', 0] }, else: null}
//         },
//         flagged: 
//         {
//         $cond: {if: '$responseExists', then: { $arrayElemAt: ['$response.monitoring.flagged', 0] }, else: false}
//         }
//       }
//   }
// ]
// const pipeline2 = 
// [
//     {
//         $match: {assessment}
//     },
//     { $unwind: '$responses' },
//     {
//         $match: {'responses.questionId': question}
//     },
//     {
//         $group: {
//         _id: '$responses.questionId',
//         question: { $first: '$responses.questionId' },
//         totalResponses: { $sum: 1 },
//         totalSkipped: 
//         {
//             $sum: 
//             {
//                 $cond: [{ $or: [{ $eq: ['$responses.answer', null] }, { $eq: [{ $size: '$responses.answer' }, 0] }] },1,0]
//             }
//         },
//         totalCorrect: 
//         {
//             $sum: 
//             {
//                 $cond: [{ $eq: ['$responses.score', '$responses.question.points'] }, 1, 0]
//             }
//         },
//         averageResponseTime: { $avg: '$responses.responseTime' },
//         highestScore: { $max: '$responses.score' },
//         averageScore: { $avg: '$responses.score'}
//         }
//     },
//     {
//         $project: 
//         {
//             _id: 0,
//             question: 1,
//             totalResponses: 1,
//             totalSkipped: 1,
//             totalCorrect: 1,
//             averageResponseTime: 1,
//             highestScore: 1,
//             averageScore: 1
//         }
//     }
// ];
//const summary = await Assessment.aggregate(pipeline)
// {
//     $sort: { totalIncorrect: -1 }
// },
// {
//     $match: { totalIncorrect: { $gt: 0 } } // Filter out questions with all correct attempts
// },
// {
//     $limit: 1
// },