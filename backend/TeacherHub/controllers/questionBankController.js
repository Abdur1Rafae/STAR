const validateFields = require('../util/library') 
const conn = require('../dbconfig/dbcon')
const Question = require('../models/Questions')
const QuestionBank = require('../models/Question_Banks')
const Assessment = require('../models/AssessmentManagement')
process.env.TZ ="Asia/Karachi"


module.exports.addQuestionToBank = async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params
        const {question} = req.body

        const session = await conn.startSession()

        const insertId = await session.withTransaction(async () => 
        {
            const newQuestion = await Question.create([question], {session})
            await Assessment.findByIdAndUpdate(
                assessmentId,
                { $push: { 'questionBank.questions' : newQuestion } }
            , {session})

            return newQuestion[0]._id
        })
        session.endSession()

        res.status(201).json({insertedId: insertId, message: 'Question Added To Bank Successfully'})
    }
    catch (err) {
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        else {res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to add question' })}   
    }
}
module.exports.updateQuestionInBank = async (req,res) => 
{
    try
    {
        const {questionId} = req.params
        const {question} = req.body

        await Question.findByIdAndUpdate(questionId, question, { new: true })
        res.status(201).json({message: 'Question Updated Successfully'})
    }
    catch (err) {
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        else {res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to update question' })}   
    }
}
module.exports.removeQuestionFromBank = async (req,res) => 
{
    try
    {
        const {assessmentId, questionId} = req.params
        const session = await conn.startSession()

        const removedQuestionId = await session.withTransaction(async () => 
        {

            const removedQuestion = await Question.findByIdAndDelete(questionId, {session})
            await Assessment.findByIdAndUpdate(
                assessmentId,
                { $pull: { "questionBank.questions": questionId } }
            , {session})

            return removedQuestion._id
        })

        session.endSession()
    
        res.status(201).json({message: 'Question Removed From Bank Successfully'})
    }
    catch (err) {
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to remove question' })
    }
}

module.exports.addReusedQuestionsToBank = async (req,res) => 
{   
    try {
        const {assessmentId} = req.params
        const {reusedQuestions} = req.body
        if(!(Array.isArray(reusedQuestions) && reusedQuestions.length > 0)){return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required: Ids of reused questions' })}
        await Assessment.findByIdAndUpdate(assessmentId, { $addToSet: { "questionBank.reusedQuestions" : reusedQuestions } })
        res.status(201).json({message: 'Question Added To Bank Successfully'})
    } 
    catch (error) {
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to add question' })
    }
}
module.exports.updateReusedQuestionInBank = async (req,res) => 
{ 
    try {
        const {assessmentId, questionId} = req.params
        const {question} = req.body
        const session = await conn.startSession()
        const insertId = await session.withTransaction(async () => 
        {

            const newQuestion = await Question.create([question], {session})

            await Assessment.findByIdAndUpdate(
                assessmentId,
                { $addToSet: { "questionBank.questions": newQuestion } }
            , {session})

            await Assessment.findByIdAndUpdate(
                assessmentId,
                { $pull: { "questionBank.reusedQuestions" : questionId } }
            , {session})
            
            return newQuestion[0]._id
        })

        session.endSession()
        res.status(201).json({inserted_id: insertId, message: 'Question Updated Successfully'})
    } 
    catch (err) {
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        else {res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to update question' })}   
    }
}
module.exports.removeReusedQuestionFromBank = async (req,res) => 
{ 
    try {
        const {assessmentId, questionId} = req.params
        await Assessment.findByIdAndUpdate(assessmentId, { $pull: { "questionBank.reusedQuestions" : questionId } })
        res.status(201).json({message: 'Question Removed From Bank Successfully'})
    } 
    catch (error) {
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to remove question' })
    }
}

module.exports.getAllBanks = async (req,res) => 
{
    try 
    { 
        const teacherId = req.body.decodedToken.email
        const questionBanks = await Assessment.aggregate([
            { $match: { teacherID: teacherId } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    updatedAt: 1,
                    questionCount: 
                    {
                        $sum: [
                            { $size: '$questionBank.questions' }, // Count of questions array
                            { $size: '$questionBank.reusedQuestions' } // Count of reusedQuestions array
                        ]
                    }
                }
            }
        ]);
        res.status(201).json({data: questionBanks})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get banks' })
        
    }
}
module.exports.getBankQuestions = async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params
        const questionBank = await Assessment.findById(assessmentId)
        .select('questionBank.questions questionBank.reusedQuestions')
        .populate({
            path: 'questionBank.questions',
            model: Question
        })
        .populate({
            path: 'questionBank.reusedQuestions',
            model: Question
        })

        if (!questionBank) {return res.status(404).json({ error: 'ER_NOT_FOUND', message: 'Question Bank Not Found' })}

        res.status(201).json({data: questionBank})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get questions' })
    }   
}
module.exports.getAllQuestions = async (req,res) => 
{
    const teacherId = req.body.decodedToken.email
    try
    {
        const questions = await Assessment.aggregate([
            { $match: { teacherID: teacherId } },
            {
                $project: {
                    allQuestions: { $concatArrays: ["$questionBank.questions", "$questionBank.reusedQuestions"] }
                }
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "allQuestions",
                    foreignField: "_id",
                    as: "allQuestions"
                }
            },
            { $unwind: "$allQuestions" }, 
            {
                $group: {
                    _id: "$allQuestions.topic",
                    questions: { $push: "$allQuestions" }
                }
            },
            { $project: { topic: '$_id', _id: 0, questions: 1 } }
        ]);
        

        res.status(201).json({data: questions})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get all questions' })
    }      
}
