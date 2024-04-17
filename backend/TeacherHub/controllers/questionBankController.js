const conn = require('../dbconfig/dbcon')
const {Question, Assessment} = require('library/index')
const {upload, remove} = require('../util/library')
const mongoose = require('mongoose')


module.exports.updateOrder = async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params
        const { order } = req.body
        console.log('order: ' + order)

        if(!(Array.isArray(order) && order.length > 0))
        {return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required: questions order' })}

        const assessment = await Assessment.findById(assessmentId)
    
        if (!assessment) 
        {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Assessment not found' })}

        if (!assessment.questionBank || assessment.questionBank.length === 0) 
        {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Question Bank Empty' })}

        if(assessment.questionBank.length != order.length)
        {return res.status(409).json({ error: "ER_CONFLICT", message: 'Discrepancy in provided arguements' })}

        const reorderedQuestionBank = order.map(id => 
        {
            return assessment.questionBank.find(item => item.question.equals(new mongoose.Types.ObjectId(id)))
        })
    
        console.log(reorderedQuestionBank)
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

        const imagePath = upload(question.image)
        question.image = imagePath
        question.teacher = teacherId

        const session = await conn.startSession()
        const insertId = await session.withTransaction(async () => 
        {
            const newQuestion = await Question.create([question], {session})
            const updatedAssessment = await Assessment.findByIdAndUpdate(
                assessmentId,
                { $addToSet: { 'questionBank' : {question: newQuestion[0]._id} } }
            , {session})

            if (!updatedAssessment) {throw new Error('Assessment not found')}

            return newQuestion[0]._id
        })
        session.endSession()

        res.status(201).json({insertedId: insertId, message: 'Question Added To Bank Successfully'})
    }
    catch (err) {
        console.log(err)
        if (err.name === 'ValidationError' || err.message === 'Invalid image data') {return res.status(400).json({ error: 'ER_VALIDATION', message: err.message })}
        else if (err.message === 'Assessment not found') {return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })} 
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
        await session.withTransaction(async () => 
        {
            const removedQuestion = await Question.findByIdAndDelete(questionId, {session})

            if (!removedQuestion) {throw new Error('Question not found')}

            remove(removedQuestion.image)

            const updatedAssessment = await Assessment.findByIdAndUpdate(
                assessmentId,
                { $pull: { questionBank: { question: questionId } } },
                { new: false }
            , {session})

            if (!updatedAssessment) {throw new Error('Assessment not found')}
        })
        session.endSession()
        
        return res.status(201).json({message: 'Question Removed From Bank Successfully'}) 
    }
    catch (err) {
        console.log(err)
        if (err.message === 'Assessment not found' || err.message === 'Question not found') {return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })} 
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

        const updatedAssessment = await Assessment.findByIdAndUpdate
        (
            assessmentId, 
            { $addToSet: { 'questionBank': { $each: reusedQuestions.map(questionId => ({ question: questionId, reuse: true })) } } }
        )
        if (!updatedAssessment) {return res.status(404).json({error: 'ER_NOT_FOUND', message: 'Assessment not found'})}

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
            const assessment = await Assessment.findById(assessmentId).session(session)

            if (!assessment) {throw new Error('Assessment not found')}

            const reused = assessment.questionBank.findIndex(item => item.question.equals(questionId))
            if(reused===-1){throw new Error('Question not found')}

            const newQuestion = await Question.create([question], {session})
            assessment.questionBank.set(reused, { question: newQuestion[0]._id, reuse: false })

            await assessment.save()
            
            return newQuestion[0]._id
        })

        session.endSession()
        res.status(201).json({inserted_id: insertId, message: 'Question Updated Successfully'})
    } 
    catch (err) {
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        else if (err.message === 'Assessment not found' || err.message === 'Question not found') {return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })} 
        else {res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to update question' })}   
    }
}
module.exports.removeReusedQuestionFromBank = async (req,res) => 
{ 
    try {
        const {assessmentId, questionId} = req.params

        const assessment = await Assessment.findById(assessmentId)

        if (!assessment) {throw new Error('Assessment not found')}

        const reused = assessment.questionBank.find(item => item.question.equals(questionId))
        if(!reused){throw new Error('Question not found')}
        assessment.questionBank.pull({ question: questionId })
        await assessment.save()

        res.status(201).json({message: 'Question Removed From Bank Successfully'})
    } 
    catch (err) {
        if (err.message === 'Assessment not found' || err.message === 'Question not found') {return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })} 
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to remove question' })
    }
}

module.exports.getAllBanks = async (req,res) => 
{
    try 
    { 
        const teacher = req.body.decodedToken.id

        const questionBanks = await Assessment.aggregate([
            { $match: { teacher: new mongoose.Types.ObjectId(teacher) } },
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
        const teacher = req.body.decodedToken.id
        const { skill, topic, difficulty, type } = req.query

        const filters = {teacher: teacher}
    
        if (skill) filters.skill = skill
        if (topic) filters.topic = topic
        if (difficulty) filters.difficulty = difficulty
        if (type) filters.type = type
    
        const questions = await Question.find(filters)

        res.status(201).json({data: questions})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get all questions' })
    }      
}
module.exports.getTopics = async (req,res) => 
{
    try
    {
        const teacher = req.body.decodedToken.id

        const uniqueTopics = await Question.distinct('topic', { teacher })

        res.status(201).json({data: uniqueTopics})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get all topics' })
    }      
}
