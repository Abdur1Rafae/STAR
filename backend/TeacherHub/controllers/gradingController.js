const {Response} = require('library/index')
const mongoose = require('mongoose')


module.exports.getQuestionSummary = async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params

        const result = await Response.aggregate([
            {
              $match: { assessment: new mongoose.Types.ObjectId(assessmentId) }
            },
            {
              $unwind: '$responses'
            },
            {
              $lookup: 
              {
                from: 'questions',
                localField: 'responses.questionId',
                foreignField: '_id',
                as: 'question'
              }
            },
            {
              $addFields: {question: { $arrayElemAt: ['$question', 0] }}
            },
            {
                $match: { 'question.type': 'Short Answer' }
            },
            {
              $group: 
              {
                _id: '$responses.questionId',
                question: { $first: '$question' },
                points: { $first: '$question.points' },
                totalResponses: { $sum: 1 },
                totalGraded: { $sum: { $cond: [{ $gt: ['$responses.score', null] }, 1, 0] } }
              }
            },
            {
              $project: 
              {
                _id: '$question._id',
                question: '$question.question',
                points: '$question.points',
                totalResponses: 1,
                totalGraded: 1
              }
            }
          ])
    
        if (!result) 
        {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Assessment not found' })}    

        res.status(201).json({data: result})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get grading summary' }) 
    }
}
module.exports.getQuestionResponses = async (req,res) => 
{
    try
    {
        const {questionId} = req.params

        const responses = await Response.aggregate([
            {
                $unwind: '$responses'
            },
            {
              $match: { 'responses.questionId': new mongoose.Types.ObjectId(questionId) }
            },
            {
              $project: 
              {
                _id: 0,
                submissionId: '$_id',
                responseId: '$responses._id',
                answer: '$responses.answer',
                score: '$responses.score',
                feedback: '$responses.feedback'
              }
            }
          ]);
    
        if (!responses) 
        {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Question not found' })}    

        res.status(201).json({data: responses})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get associated responses' }) 
    }
}
module.exports.gradeResponse = async (req,res) => 
{
    try
    {
      const {submissionId, responseId} = req.params
      const {score, feedback} = req.body
      console.log(req.body)

      if(score == null){return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required: score' })}

      const submission = await Response.findById(submissionId)

      if (!submission) {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Submission not found' })} 

      const responseToUpdate = submission.responses.find(response => response._id.equals(responseId))

      if (!responseToUpdate) {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Response not found' });}

      const oldScore = responseToUpdate.score
      responseToUpdate.score = score
      responseToUpdate.feedback = feedback
      if(oldScore>0){submission.totalScore += score - oldScore}
      

      await submission.save()

      res.status(201).json({message: 'Response Graded Successfully'})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to grade response' }) 
    }
}
