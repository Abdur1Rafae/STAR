const conn = require('../dbconfig/dbcon')
const Question = require('../models/Question')
const Assessment = require('../models/Assessment')
const {upload, remove} = require('../util/library')
process.env.TZ ="Asia/Karachi"


module.exports.updateOrder = async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params
        const { order } = req.body

        if(!(Array.isArray(order) && order.length > 0))
        {return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required: questions order' })}

        const assessment = await Assessment.findById(assessmentId)
    
        if (!assessment) {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Assessment not found' })}
        if (!assessment.questionBank || assessment.questionBank.length === 0) {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Question Bank Empty' })}
    
        const reorderedQuestionBank = order.map(id => 
        {
          return assessment.questionBank.find(item => item.question._id === id)
        })
    
        assessment.questionBank = reorderedQuestionBank
        await assessment.save()

        res.status(201).json({message: 'Questions reordered successfully'})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to reorder questions' }) 
    }
}

module.exports.addQuestionToBank = async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params
        let {question} = req.body
        const teacherId = req.body.decodedToken.id

        const session = await conn.startSession()

        const imagePath = upload(question.image)
        question.image = imagePath
        question.teacher = teacherId

        const insertId = await session.withTransaction(async () => 
        {
            const newQuestion = await Question.create([question], {session})
            await Assessment.findByIdAndUpdate(
                assessmentId,
                { $push: { 'questionBank' : {question: newQuestion[0]._id} } }
            , {session})

            return newQuestion[0]._id
        })
        session.endSession()

        res.status(201).json({insertedId: insertId, message: 'Question Added To Bank Successfully'})
    }
    catch (err) {
        console.log(err)
        if (err.name === 'ValidationError' || err.message === 'Invalid image data' || err.message === 'Failed to save image') {return res.status(400).json({ error: 'ER_VALIDATION', message: err.message })} 
        else {res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to add question' })}   
    }
}
module.exports.updateQuestionInBank = async (req,res) => 
{
    try
    {
        const {questionId} = req.params
        const {question} = req.body

        const imagePath = upload(question.image)
        question.image = imagePath

        const oldQuestion =  await Question.findOneAndUpdate
        (
            {_id : questionId}, 
            question, 
            { new: false }
        )

        if(oldQuestion)
        {
            remove(oldQuestion.image)
            return res.status(201).json({message: 'Question Updated Successfully'})
        }
        else{ return res.status(404).json({error: 'ER_NOT_FOUND', message: 'Question Not Found'})}
        
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
        const deletedQuestion = await session.withTransaction(async () => 
        {
            const removedQuestion = await Question.findByIdAndDelete(questionId, {session})
            await Assessment.findByIdAndUpdate(
                assessmentId,
                { $pull: { questionBank: { question: questionId } } },
                { new: false }
            , {session})

            return removedQuestion
        })
        session.endSession()

        if(deletedQuestion)
        {
            remove(deletedQuestion.image)
            return res.status(201).json({message: 'Question Removed From Bank Successfully'})
        }
        else{ return res.status(404).json({error: 'ER_NOT_FOUND', message: 'Question Not Found'})}
      
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to remove question' })
    }
}

module.exports.addReusedQuestionsToBank = async (req,res) => 
{   
    try {
        const {assessmentId} = req.params
        const {reusedQuestions} = req.body

        if(!(Array.isArray(reusedQuestions) && reusedQuestions.length > 0))
        {return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required: Ids of reused questions' })}

        await Assessment.findByIdAndUpdate
        (
            assessmentId, 
            { $push: { 'questionBank': { $each: reusedQuestions.map(questionId => ({ question: questionId, reuse: true })) } } }
        )

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
        const teacherId = req.body.decodedToken.id

        const imagePath = upload(question.image)
        question.image = imagePath
        question.teacher = teacherId

        const session = await conn.startSession()
        const insertId = await session.withTransaction(async () => 
        {

            const newQuestion = await Question.create([question], {session})

            await Assessment.findByIdAndUpdate(
                assessmentId,
                { $push: { 'questionBank' : {question: newQuestion[0]._id} } },
                 {session})

            await Assessment.findByIdAndUpdate(
            assessmentId,
            { $pull: { 'questionBank' : { question: questionId } } },
                {session})
            
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

        await Assessment.findByIdAndUpdate
        (
            assessmentId,
            { $pull: { questionBank: { question: questionId } } }
        )

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
                    questionCount: { $cond: { if: { $isArray: '$questionBank' }, then: { $size: '$questionBank' }, else: 0 } } 
                }
            }
        ])

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
        .select('questionBank -_id')
        .populate({
            path: 'questionBank.question',
            select: '-teacher -__v',
            model: Question
        })

        if (!questionBank) {return res.status(201).json({data : []})}

        const formattedData = questionBank.questionBank.map(item => ({
            ...item.question.toObject(),
            reuse: item.reuse
          }))

        res.status(201).json({data: formattedData})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get questions' })
    }   
}
module.exports.getAllQuestions = async (req,res) => 
{
    try
    {
        const teacherId = req.body.decodedToken.id
        const {skill, topic, difficulty, type} = req.body

        const filters = {
            teacher: teacherId,
            skill: skill, 
            topic: topic, 
            type: type,
            difficulty: difficulty

        }
        
        Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key])
        
        const questions = await Question.find(filters)

        res.status(201).json({data: questions})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get all questions' })
    }      
}
