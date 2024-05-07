const conn = require('../dbconfig/dbcon')
const {Assessment, Section, Class} = require('library/index')
const remove = require('../util/remove')

function getAssessmentStatus(openDate, closeDate) 
{
    const currentDate = new Date()
    
    if (currentDate < openDate) {return "Not Started"}

    if (currentDate < closeDate && openDate < currentDate) {return "In Progress"}

    return "Requires Review"
}

module.exports.createAssessment = async (req,res) => 
{
    try{
        const teacher = req.body.decodedToken.id

        var {title, description, participants, configurations, coverImage} = req.body

        const session = await conn.startSession()
        const insertedId = await session.withTransaction(async () => 
        {
            const sections = await Section.find({ _id: { $in: participants } }, { class: 1 }).session(session)
    
            const uniqueClasses = new Set(sections.map(section => section.class.toString()))
            if (uniqueClasses.size !== 1) {throw new Error('Sections belong to different classes')}

            const classId = [...uniqueClasses][0];
            const classInfo = await Class.findById(classId, { className: 1 }).session(session)
            
            const newAssessment = await Assessment.create(
            [{
                teacher, class: classInfo.className, title, description, participants, configurations, coverImage
            }], {session})

            const updatedSections = await Section.updateMany
            (
                { _id: { $in: participants } }, 
                { $push: { assessments: newAssessment[0] } } 
            )

            if(updatedSections.matchedCount != participants.length){throw new Error('Failed to add all sections')}

            return newAssessment[0]._id

        })
        session.endSession()
    
        res.status(200).json({assessmentId: insertedId, message: `Assessment Created Successfully`})  
    }
    catch(err){
        if (err.name === 'ValidationError' || err.message === 'Invalid image data' || err.message === 'Failed to add all sections' || err.message === 'Sections belong to different classes') {return res.status(400).json({ error: 'ER_VALIDATION', message: err.message })}
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create assessment'})
    }
}
module.exports.updateAssessment = async (req,res) => 
{ 
    try{
        const { assessmentId } = req.params

        const teacherID = req.body.decodedToken.email

        var {title, description, participants, configurations, coverImage} = req.body

        const session = await conn.startSession()
        await session.withTransaction(async () => 
        {

            const oldAssessment = await Assessment.findOneAndUpdate
            (
                {_id : assessmentId}, 
                {teacherID, title, description, participants, configurations, coverImage},
                {new: false},
                {session}
            )

            if(!oldAssessment){throw new Error('Assessment not found')}

            const oldParticipants = oldAssessment.participants.map(String)
            const newParticipants = participants

            const sectionsToRemove = oldParticipants.filter(sectionId => !newParticipants.includes(sectionId))
            const sectionsToAdd = newParticipants.filter(sectionId => !oldParticipants.includes(sectionId))

            const removedSections = await Section.updateMany({ _id: { $in: sectionsToRemove } }, { $pull: { assessments: assessmentId } }, {session})
            const addedSections = await Section.updateMany({ _id: { $in: sectionsToAdd } }, { $addToSet: { assessments: assessmentId } }, {session})

            if(removedSections.matchedCount != sectionsToRemove.length && addedSections.matchedCount != sectionsToAdd.length){throw new Error('Failed to update participants')}
        })
        session.endSession()
        return res.status(200).json({message: `Assessment Updated Successfully`})  
    }
    catch(err){
        if (err.name === 'ValidationError' || err.message === 'Failed to update participants') {return res.status(400).json({ error: 'ER_VALIDATION', message: err.message })}
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to update assessment'})}
}
module.exports.deleteAssessment = async (req,res) => 
{
    try{
        const { assessmentId } = req.params

        const session = await conn.startSession()
        await session.withTransaction(async () => 
        {
            const deletedAssessment = await Assessment.findByIdAndDelete(assessmentId, {session})

            if(!deletedAssessment){throw new Error('Assessment not found')}

            const updatedSections = await Section.updateMany
            (
                { _id: { $in: deletedAssessment.participants } }, 
                { $pull: { assessments: deletedAssessment._id } },
                {session}
            )

            if(updatedSections.matchedCount != deletedAssessment.participants.length){throw new Error('Failed to update all sections')}

            remove(deletedAssessment.coverImage)
        })
        session.endSession()
    
        return res.status(200).json({message: `Assessment Deleted Successfully`})  
    }
    catch(err){
        if (err.message === 'Failed to update all sections' || err.message === 'Assessment not found') {return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })}
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to delete assessment'})}
}
module.exports.getScheduledAssessments = async (req,res) => 
{
    try
    {
        const teacher = req.body.decodedToken.id

        const assessments = await Assessment.find({ teacher: teacher, status: { $nin: ["Published", "Reviewed"] } })
        .populate
        ({
            path: 'participants',
            select: 'roster class sectionName',
        })
        .populate
        ({
            path: 'questionBank.question',
            select: 'points'
        })

        if(!assessments){return res.status(200).json({data: []})}

        const categorizedAssessments = assessments.map(assessment => {
            return {
                _id: assessment._id,
                title: assessment.title,
                description: assessment.description,
                className:  assessment.class,
                participants: assessment.participants.reduce((names, section) => names.concat({_id: section._id, name: section.sectionName}), []),
                configurations: assessment.configurations,
                coverImage: assessment.coverImage,
                totalQuestions: assessment.questionBank ? assessment.questionBank.length : 0,
                totalStudents: assessment.participants.reduce((total, section) => total + (section.roster ? section.roster.length : 0), 0),
                totalMarks: assessment.questionBank.reduce((total, questionObj) => total + (questionObj.question ? questionObj.question.points : 0) , 0),
                category: getAssessmentStatus(assessment.configurations.openDate, assessment.configurations.closeDate),
            }
        })

        return res.status(200).json({data: categorizedAssessments})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get scheduled assessments'})}
}
