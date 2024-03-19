const Query = require('../db_manager/assessmentQuery')
const executeQuery = require('../db_manager/dbconn')
const validateFields = require('../util/library')
const fs = require('fs')
const uploadDir = 'uploads/'

function upload(image)
{
    if(!image){return null}

    const matches = image.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/)

    if (!matches || matches.length !== 3) {throw new Error('Invalid image data')}
    
    const imageType = matches[1]
    const imageData = matches[2]

    const supportedFormats = ['png', 'jpeg', 'gif']
    if (!supportedFormats.includes(imageType)) { throw new Error ('Unsupported image format')}
    
    const buffer = Buffer.from(imageData, 'base64')
    const imageSizeInBytes = Buffer.byteLength(buffer)
    const maxSizeInBytes = 4 * 1024 * 1024 // 4MB limit
    
    if (imageSizeInBytes > maxSizeInBytes) {
        throw new Error('Image size exceeds 4MB limit' )
    }

    const fileName = `image_${Date.now()}.${imageType}`
    const filePath = `uploads/${fileName}`
    
    // Write the buffer to the file
    fs.writeFile(filePath, buffer, (err) => 
    {
        if (err) {throw new Error('Failed to save image')}  
    })
    return filePath
}
function remove(imagePath)
{
    if(!imagePath){return}
    fs.unlinkSync(imagePath, (err) => {
        if (err) {throw new Error ('Error deleting Cover Image')}
    })
}

module.exports.createAssessment = async (req,res) => 
{
    const email = req.body.decodedToken.email

    const requiredFields = ['repoId', 'openDate', 'duration', 'closeDate', 'title', 'description', 'sections']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })} 

    var {repoId, openDate, duration, closeDate, adaptiveTesting, monitoring, instantFeedback, navigation, title, description, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore, coverImage, sections, marks, questions} = req.body
    var query = Query.CREATE_ASSESSMENT + `${sections.map(sectionId => `(@assessmentId, ?)`).join(', ')}`

    try{
        const imagePath = upload(coverImage)

        const values = [sections, email, repoId, openDate, duration, closeDate, adaptiveTesting, monitoring, instantFeedback, navigation, title, description, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore, imagePath, marks, questions]
        sections.forEach(sectionId => {values.push(sectionId)})

        var result = await executeQuery(query, values)
        return res.status(200).json({assessmentId: result[1].insertId, message: `Assessment Created Successfully`})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create assessment'})
    }
}
module.exports.updateAssessment = async (req,res) => 
{
    const requiredFields = ['assessmentId']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    try{
        var {repoId, openDate, duration, closeDate, adaptiveTesting, monitoring, instantFeedback, navigation, title, description, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore, coverImage, assessmentId, marks, questions} = req.body
        const imagePath = upload(coverImage)
        const values = [assessmentId, repoId, openDate, duration, closeDate, adaptiveTesting, monitoring, instantFeedback, navigation, title, description, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore, imagePath, marks, questions, assessmentId]

        const result = await executeQuery(Query.UPDATE_ASSESSMENT, values)
        remove(result[0][0].CoverImage)
        return res.status(200).json({message: `Assessment Updated Successfully`})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to update assessment'})}
}
module.exports.deleteAssessment = async (req,res) => 
{
    const requiredFields = ['assessmentId']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    
    var {assessmentId} = req.body

    try{
        const result = await executeQuery(Query.DELETE_ASSESSMENT, [assessmentId,assessmentId])
        remove(result[0][0].CoverImage)
        return res.status(200).json({message: `Assessment Deleted Successfully`})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to delete assessment'})}
}
module.exports.getAssessmentDetails = async (req,res) => 
{
    const email = req.body.decodedToken.email

    const requiredFields = ['assessmentId']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    
    var {assessmentId} = req.body

    try{
        const result = await executeQuery(Query.GET_ASSESSMENT_DETAILS, [assessmentId])
        return res.status(200).json({data: result[0]})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get assessment details'})}
}
module.exports.getScheduledAssessments = async (req,res) => 
{
    const email = req.body.decodedToken.email

    try{
        const result = await executeQuery(Query.GET_SCHEDULED_ASSESSMENTS, [email])
        return res.status(200).json({data: result})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get scheduled assessments'})}
}
module.exports.getPublishedAssessments = async (req,res) => 
{
    const email = req.body.decodedToken.email

    try{
        const result = await executeQuery(Query.GET_PUBLISHED_ASSESSMENTS, [email])
        return res.status(200).json({data: result})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get published assessments'})}
}

module.exports.getUpcomingAssessments = async (req,res) => 
{
    const email = req.body.decodedToken.email

    try{
        const result = await executeQuery(Query.GET_UPCOMING_ASSESSMENTS, [email])
        return res.status(200).json({data: result})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get upcoming assessments'})}
}
module.exports.getOngoingAssessments = async (req,res) => 
{
    const email = req.body.decodedToken.email

    try{
        const result = await executeQuery(Query.GET_ONGOING_ASSESSMENTS, [email])
        return res.status(200).json({data: result})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get ongoing assessments'})}
}