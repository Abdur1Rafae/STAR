const conn = require('../dbconfig/dbcon')
const { ObjectId } = require('mongodb')
const {getAssessmentStatus, upload, remove} = require('../util/library')
const Assessment = require('../models/AssessmentManagement')
const Class = require('../models/ClassManagement')

module.exports.createAssessment = async (req,res) => 
{
    const teacherID = req.body.decodedToken.email

    var {title, description, participants, configurations, coverImage} = req.body

    try{
        const imagePath = upload(coverImage)
        const newAssessment = await Assessment.create(
        {
            teacherID, title, description, participants, configurations, coverImage : imagePath
        })
        res.status(200).json({assessmentId: newAssessment._id, message: `Assessment Created Successfully`})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create assessment'})
    }
}
module.exports.updateAssessment = async (req,res) => 
{ 
    const teacherID = req.body.decodedToken.email

    try{
        const { assessmentId } = req.params
        var {title, description, participants, configurations, coverImage} = req.body
        const imagePath = upload(coverImage)

        const oldAssessment = await Assessment.findOneAndUpdate(
            {_id : assessmentId}, 
            {teacherID, title, description, participants, configurations, coverImage : imagePath},
            {new: false}
            )

        remove(oldAssessment.coverImage)
        return res.status(200).json({message: `Assessment Updated Successfully`})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to update assessment'})}
}
module.exports.deleteAssessment = async (req,res) => 
{
    try{
        const { assessmentId } = req.params
        await Assessment.findByIdAndDelete(assessmentId)
    
        return res.status(200).json({message: `Assessment Deleted Successfully`})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to delete assessment'})}
}
module.exports.getAssessmentDetails = async (req,res) => 
{ 
    try{
        var {assessmentId} = req.params
        const assessment = await Assessment.aggregate([
            { $match: { _id: new ObjectId(assessmentId) }  },
            { $unwind: '$participants' },
            {
                $lookup: {
                    from: 'classes',
                    let: { sectionId: '$participants' },
                    pipeline: [
                        { $unwind: '$sections' },
                        { $match: { $expr: { $eq: ['$sections._id', '$$sectionId'] } } },
                        { $project: { _id: 0, sectionName: '$sections.sectionName'} }
                    ],
                    as: 'sectionInfo'
                }
            },
            { $unwind: '$sectionInfo' },
            {
                $group: {
                    _id: '$_id',
                    title: { $first: '$title' },
                    description: { $first: '$description' },
                    configurations : { $first: '$configurations' },
                    participants: { $addToSet: '$sectionInfo.sectionName' },
                    coverImage: { $first: 'coverImage' },
                }
            }   
        ])

        return res.status(200).json({data: assessment})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get assessment details'})}
}
module.exports.getScheduledAssessments = async (req,res) => 
{
    const teacherID = req.body.decodedToken.email

    try
    {
        const assessments = await Assessment.aggregate([
            { $match: { teacherID }  },
            { $match: { status: { $ne: "Published" }}  },
            { $unwind: '$participants' },
            {
                $lookup: {
                    from: 'classes',
                    let: { sectionId: '$participants' },
                    pipeline: [
                        { $unwind: '$sections' },
                        { $match: { $expr: { $eq: ['$sections._id', '$$sectionId'] } } },
                        { $project: { _id: 0, sectionName: '$sections.sectionName', roster: { $size: '$sections.roster' } } }
                    ],
                    as: 'sectionInfo'
                }
            },
            { $unwind: '$sectionInfo' },
            {
                $addFields:{
                  questionCount: { $sum: 
                    [
                        { $size: { $ifNull: [ '$questionBank.questions', [] ] } }, 
                        { $size: { $ifNull: [ '$questionBank.reusedQuestions', [] ] } }
                    ]}
                }
             },
            {
                $group: {
                    _id: '$_id',
                    title: { $first: '$title' },
                    openDate: { $first: '$configurations.openDate' },
                    closeDate: { $first: '$configurations.closeDate' },
                    duration: { $first: '$configurations.duration' },
                    totalStudents: { $sum: '$sectionInfo.roster' },
                    questions: {$first: '$questionCount'}
                }
            }   
        ])

        const categorizedAssessments = assessments.map(assessment => {
            return {
                ...assessment,
                catgeory: getAssessmentStatus(assessment) 
            }
        })

        return res.status(200).json({data: categorizedAssessments})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get scheduled assessments'})}
}
//TO BE IMPLEMENTED LATER
module.exports.getPublishedAssessments = async (req,res) => 
{
    const teacherID = req.body.decodedToken.email

    try{
        return res.status(200).json({data: []})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get published assessments'})}
}
