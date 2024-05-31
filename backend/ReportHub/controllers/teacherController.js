const mongoose = require('mongoose')
const {Assessment, Response} = require('library/index')

function findMostIncorrectQuestion(questions) 
{
    let mostIncorrect = null;
    let maxIncorrect = 0;

    questions.forEach((question) => {
        const totalIncorrect = question.totalResponses - (question.totalCorrect + question.totalSkipped);
        if (totalIncorrect > maxIncorrect) {
            mostIncorrect = {question: question.question, totalResponses: question.totalResponses, totalIncorrect}
            maxIncorrect = totalIncorrect;
        }
    });

    return mostIncorrect;
}
function findMostIncorrectOverall(participants) 
{
    const allQuestions = participants.flatMap(participant => participant.questions);

    const groupedQuestions = allQuestions.reduce((acc, question) => 
    {
        const { question: questionId, totalResponses, totalCorrect, totalSkipped } = question;
        const totalIncorrect = totalResponses - (totalCorrect + totalSkipped);
        if (!acc[questionId]) {
            acc[questionId] = { questionId, totalIncorrect, totalResponses };
        } else {
            acc[questionId].totalIncorrect += totalIncorrect;
            acc[questionId].totalResponses += totalResponses
        }
        return acc;
    }, {});

    const questionsArray = Object.values(groupedQuestions)

    questionsArray.sort((a, b) => b.totalIncorrect - a.totalIncorrect)

    const question = questionsArray.length > 0 ? questionsArray[0] : null

    if(!question || question.totalIncorrect === 0){return null}
    else
    {
        return{
            question: question.questionId,
            totalIncorrect: question.totalIncorrect,
            totalResponses: question.totalResponses

        }
    }
}
function calculateTopicBreakdown(responses) {
    const topicBreakdown = {};

    responses.forEach(response => {
        const questionId = response.questionId;
        const score = response.score;
        const topic = questionId.topic;

        if (topic in topicBreakdown) {topicBreakdown[topic].count++} 
        else { topicBreakdown[topic] = {count: 1, totalCorrect:0}}

        if(questionId.points === score){topicBreakdown[topic].totalCorrect++}
    })

    return topicBreakdown;
}

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
        .select('summary.participants questionBank.question totalMarks configurations.adaptiveTesting -_id')
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

        const pipelineBreakDown=
        [
            {
              $match: {
                _id: new mongoose.Types.ObjectId(assessmentId),
              },
            },
            { $unwind: "$summary.participants" },
            {
              $project: {
                _id: 0,
                section:
                  "$summary.participants.sectionId",
                questions:
                  "$summary.participants.questions",
              },
            },
            { $unwind: "$questions" },
            {
              $lookup: {
                from: "questions",
                localField: "questions.question",
                foreignField: "_id",
                pipeline: [
                  { $project: { topic: 1, points: 1 } },
                ],
                as: "questions.question",
              },
            },
            { $unwind: "$questions.question" },
            {
              $group: {
                _id: {
                  topic: "$questions.question.topic",
                  section: "$section",
                },
                totalResponses: {
                  $sum: "$questions.totalResponses",
                },
                totalCorrect: {
                  $sum: "$questions.totalCorrect",
                },
              },
              },
            {
              $addFields: 
              {
                percentage: 
                {
                  $cond: { if: { $eq: ["$totalResponses", 0] }, then: 0, else: { $divide: ["$totalCorrect", "$totalResponses"] } },
                },
              },
            },
            {
              $facet: {
                sectionWise: [
                  {
                    $group: {
                      _id: "$_id.section",
                      breakdown: {
                        $push: {
                          _id: "$_id.topic",
                          percentage: "$percentage",
                        },
                      },
                    },
                  },
                ],
                overall: [
                  {
                    $group: 
                    {
                        _id: "$_id.topic",
                                    percentage: {$first: "$percentage"},
                    },
                  },
                ],
              },
            },
        ]

        const breakDown = await Assessment.aggregate(pipelineBreakDown)

        const questionBank = assessment.questionBank.map( item => 
        ({
            ...item.question.toObject(),
        }))

        const participants = assessment.summary.participants.map(item => {
            const { questions, _id , ...rest } = item.toObject()
            const sectionBreakDown = breakDown[0].sectionWise.find((sectionItem) => sectionItem._id.equals(new mongoose.Types.ObjectId(item.sectionId)))
            if(sectionBreakDown && sectionBreakDown.breakdown) {
              return { ...rest, topicBreakDown : sectionBreakDown.breakdown, mostIncorrectQuestion: findMostIncorrectQuestion(questions)}
            }
            else{return { ...rest, mostIncorrectQuestion: findMostIncorrectQuestion(questions)}}
          })

        const report = 
        {
            questionBank, 
            participants, 
            totalMarks: assessment.configurations.adaptiveTesting.active === true ? assessment.configurations.adaptiveTesting.totalMarks : assessment.totalMarks, 
            topicBreakDown: breakDown[0].overall,
            mostIncorrectQuestion: findMostIncorrectOverall(assessment.summary.participants)
        }
        res.status(201).json(report)

    }
    catch(err)
    {
      console.log(err)
      res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to generate report'})
    }
}
module.exports.getQuestionSummary= async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params

        const assessment = await Assessment.findById(assessmentId)
        .select('summary.participants -_id')

        if (!assessment){return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Assessment not found' })}

        const pipelineOptionsBreakDown =
        [
            {
              $match: {
                assessment: new mongoose.Types.ObjectId(assessmentId)
              }
            },
            {
              $project: {
                section: 1,
                responses: 1
              }
            },
            { $unwind: "$responses" },
            {
              $lookup: 
              {
                from: "questions",
                localField: "responses.questionId",
                foreignField: "_id",
                as: "question"
              }
            },
            { $unwind: "$question" },
            {
              $match: {
                $or: [{ "question.type": "MCQ" }, { "question.type": "True/False" }]
              }
            },
            {
              $unwind: "$question.options"
            },
            {
              $group: {
                _id: {
                  section: '$section',
                  question: "$responses.questionId",
                  option: "$question.options"
                },
                count: { $sum: { $cond: [{ $in: ["$question.options", "$responses.answer"] }, 1, 0] } }
              }
            },
            {
              $group: {
                _id: {
                  section: '$_id.section',
                  question: "$_id.question",
                },
                options: {
                  $push: {
                    option: "$_id.option",
                    count: "$count"
                  }
                }
              }
            },
            {
              $group: {
                _id: '$_id.section',
                questions: {
                  $push: {
                    question: "$_id.question",
                    breakDown: "$options"
                  }
                }
              }
            }
        ]
           
        const optionsBreakDown = await Response.aggregate(pipelineOptionsBreakDown)

        const report = assessment.summary.participants.map(section => 
        {
            let questions = section.questions
            let questionsBreakDown = optionsBreakDown.find((sectionItem) => sectionItem._id.equals(new mongoose.Types.ObjectId(section.sectionId)))
            if(questionsBreakDown && questionsBreakDown.questions)
            {
              questions = questions.map(question =>
                {
                  const optionBreakDown = questionsBreakDown.questions.find(item => item.question.equals(new mongoose.Types.ObjectId(question.question)))
                  console.log(optionBreakDown)
                  if(optionBreakDown && optionBreakDown.breakDown){return {...question.toObject(), optionsBreakDown: optionBreakDown.breakDown}}
                  else{return {...question.toObject()}}
        
                })
            }
            return{
              section: section.sectionName,
              questions: questions,
          }
        })

        res.status(201).json(report)

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to generate report'})
    }
}
module.exports.getIndividualResponse= async (req,res) => 
{
    try
    {
        const {responseId} = req.params

        let response = await Response.findById(responseId)
        .select('assessment section responses totalScore previousScore previousTotal student')
        .populate({
            path: 'responses.questionId',
            select: 'topic points'
        })
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

        const topicBreakDown = calculateTopicBreakdown(response.responses)

        if (!response){return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Response not found' })}
        console.log(response)

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

        const responses = response.responses.map( item => 
        {
            const {questionId, _id, ...rest} = item.toObject()
            return {questionId: questionId._id, ...rest }
        })

        const report = 
        {
            responses, 
            topicBreakDown,
            totalScore: response.totalScore,
            previousScore: previousScore || null, 
            previousTotal: previousTotal || null
        }

        res.status(201).json(report)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to generate question report'})
    }
}