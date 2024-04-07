const conn = require('../dbconfig/dbcon')
const mongoose = require('mongoose')
const {getAssessmentStatus, upload, remove} = require('../util/library')
const Assessment = require('../models/Assessment')
const Section = require('../models/Section')

module.exports.createAssessment = async (req,res) => 
{
    try{
        const teacher = req.body.decodedToken.id

        var {title, description, participants, configurations, coverImage} = req.body

        const imagePath = upload(coverImage)

        const session = await conn.startSession()
        const insertedId = await session.withTransaction(async () => 
        {
            
            const newAssessment = await Assessment.create(
            {
                teacher, title, description, participants, configurations, coverImage : imagePath
            })

            await Section.updateMany
            (
                { _id: { $in: participants } }, 
                { $push: { assessments: newAssessment } } 
            )

            return newAssessment._id

        })
        session.endSession()

        res.status(200).json({assessmentId: insertedId, message: `Assessment Created Successfully`})  
    }
    catch(err){
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create assessment'})
    }
}
module.exports.updateAssessment = async (req,res) => 
{ 
    try{
        const { assessmentId } = req.params

        const teacherID = req.body.decodedToken.email

        var {title, description, participants, configurations, coverImage} = req.body

        const imagePath = upload(coverImage)

        const session = await conn.startSession()
        await session.withTransaction(async () => 
        {

            const oldAssessment = await Assessment.findOneAndUpdate
            (
                {_id : assessmentId}, 
                {teacherID, title, description, participants, configurations, coverImage : imagePath},
                {new: false}
            )
            
            remove(oldAssessment.coverImage)

            const oldParticipants = oldAssessment.participants.map(String)
            const newParticipants = participants

            const sectionsToRemove = oldParticipants.filter(sectionId => !newParticipants.includes(sectionId))
            const sectionsToAdd = newParticipants.filter(sectionId => !oldParticipants.includes(sectionId))

            await Section.updateMany({ _id: { $in: sectionsToRemove } }, { $pull: { assessments: assessmentId } })
            await Section.updateMany({ _id: { $in: sectionsToAdd } }, { $addToSet: { assessments: assessmentId } })

        })
        session.endSession()
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

        const session = await conn.startSession()
        await session.withTransaction(async () => 
        {
            const deletedAssessment = await Assessment.findByIdAndDelete(assessmentId)

            await Section.updateMany
            (
                { _id: { $in: deletedAssessment.participants } }, 
                { $pull: { assessments: deletedAssessment._id } } 
            )

        })
    
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

        const assessmentDetails = await Assessment.findById(assessmentId)
        .populate({
            path: 'participants',
            select: 'sectionName',
        })
        .select('-questionBank -createdAt -updatedAt -status -teacher -v')

        return res.status(200).json({data: assessmentDetails})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get assessment details'})}
}
module.exports.getScheduledAssessments = async (req,res) => 
{
    try
    {
        const teacher = req.body.decodedToken.id

        const assessments = await Assessment.aggregate([
            {
                $match: { teacher: new mongoose.Types.ObjectId(teacher) }
            },
            {
                $match: { status: { $ne: "Published" } }
            },
            {
                $lookup: {
                    from: "sections",
                    localField: "participants",
                    foreignField: "_id",
                    as: "sections"
                }
            },
            {
                $unwind: "$sections"
            },
            {
                $group: {
                    _id: "$_id",
                    title: { $first: "$title" },
                    openDate: { $first: "$configurations.openDate" },
                    closeDate: { $first: "$configurations.closeDate" },
                    duration: { $first: "$configurations.duration" },
                    totalQuestions: {
                        $sum: {
                            $size: { $ifNull: ["$questionBank.questions", []] },
                            $size: { $ifNull: ["$questionBank.reusedQuestions", []] }
                        }
                    },
                    totalStudents: { $sum: { $size: "$sections.roster" } }
                }
            }
        ]);
        

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
