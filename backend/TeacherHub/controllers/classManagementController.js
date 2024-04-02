const conn = require('../dbconfig/dbcon')
const Joi = require('joi')
const {validateFields} = require('../util/library')
const Class = require('../models/Class')
const Teacher = require('../models/Teacher')
const Section = require('../models/Section')
const Student = require('../models/Student')

module.exports.createClass = async (req,res) => 
{
    try{
        const teacher = req.body.decodedToken.id
        var {className} = req.body

        const session = await conn.startSession()
        const insertId = await session.withTransaction(async () => 
        {
            const newClass = await Class.create({className, teacher})
            await Teacher.findByIdAndUpdate(teacher, { $push: { classes: newClass } }, { new: false })

            return newClass._id
        })
        session.endSession()

        return res.status(200).json({classId: insertId, message: `Class Created Successfully`})  
    }
    catch(err){
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create class'})}
}
module.exports.deleteClass = async (req,res) => 
{
    try{
        const teacher = req.body.decodedToken.id
        const {classId} = req.params

        const session = await conn.startSession()
        await session.withTransaction(async () => 
        {
            await Class.findByIdAndDelete(classId)
            await Teacher.findByIdAndUpdate(teacher, { $pull: { classes: classId } }, { new: false })
        })
        session.endSession()

        return res.status(200).json({message: `Class Deleted Successfully`}) 
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to delete class'})
    }
}
module.exports.updateClass = async (req,res) => 
{
    const {className} = req.body
    if(!className){return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required : Class Name'})}   

    try{
        const {classId} = req.params

        await Class.findByIdAndUpdate(classId, { className })

        return res.status(200).json({message: `Class Updated Successfully`})     
    }
    catch(err){
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to update class'})
    }
}
module.exports.createSection = async (req,res) => 
{
    try{
        const {classId} = req.params
        const{sectionName} = req.body
        
        const session = await conn.startSession()
        const insertId = await session.withTransaction(async () => 
        {
            const newSection = await Section.create({sectionName, class: classId})
            await Class.findByIdAndUpdate(classId, { $push: { sections: newSection } }, { new: false })

            return newSection._id

        })
        session.endSession()

        return res.status(200).json({sectionId: insertId, message: `Section Created Successfully`})  
    }
    catch(err){
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create section'})}
}
module.exports.deleteSection = async (req,res) => 
{
    try{
        const { sectionId } = req.params

        const session = await conn.startSession()
        await session.withTransaction(async () => 
        {

            const removedSection = await Section.findByIdAndDelete(sectionId)
            const classId = removedSection.class
            await Class.findByIdAndUpdate( classId,{ $pull: { sections: sectionId } }, { new: false })

        })
        session.endSession()

        return res.status(200).json({message: `Section Deleted Successfully`})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to delete section'})
    }
}
module.exports.updateSection = async (req,res) => 
{
    const {sectionName} = req.body
    if(!sectionName){return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required : Section Name' })}    

    try{
        const {sectionId}  = req.params
        
        await Section.findByIdAndUpdate(sectionId, { sectionName })

        return res.status(200).json({message: `Section Updated Successfully`})        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to update section'})
    }
}
module.exports.addStudentsToSection = async (req,res) => 
{
    const {students} = req.body

    const studentSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        erp: Joi.number().required()
    })
    const studentDataSchema = Joi.array().items(studentSchema)

    const validationResult = studentDataSchema.validate(students)
    if(validationResult.error){return res.status(400).json({ error: 'ER_Validation', message: validationResult.error.details })}  

    try{
        const { sectionId } = req.params
        
        const session = await conn.startSession()
        const insertedIds = await session.withTransaction(async () => 
        {
            const section = await Section.findById(sectionId)
            if (!section) {return res.status(404).json({ error : 'ER_NOT_FOUND', message: 'Section not found' })}

            const bulkOps = []

            for (const studentData of students) 
            {
                const { name, email, erp } = studentData

                const updateOp = {
                    updateOne: 
                    {
                        filter: { email },
                        update: 
                        {
                            $addToSet: { enrolledSections: sectionId },
                            $setOnInsert: { name, erp }
                        },
                        upsert: true
                    }
                }

                bulkOps.push(updateOp)
            }

            const result = await Student.bulkWrite(bulkOps, {session})

            const upsertedIds = Object.values(result.upsertedIds || {})

            let modifiedIds = []

            if (result.modifiedCount > 0) 
            {
                let modifiedEmails = []
                modifiedEmails.push(...bulkOps.map(op => op.updateOne.filter.email))
                const modifiedStudents = await Student.find({ email: { $in: modifiedEmails } }, { _id: 1 })
                modifiedIds = modifiedStudents.map(student => student._id)
            }

            const insertedIds = upsertedIds.concat(modifiedIds)
            
            section.roster.push(...Object.values(insertedIds))

            await section.save({session})

            return insertedIds
        })
        session.endSession()

        res.status(200).json({studentIds: insertedIds, message: `Enrollment Complete`})  
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to add students to section'})
    }
}
module.exports.removeStudentFromSection = async (req,res) => 
{    
    try{
        const { sectionId, studentId } = req.params
        
        const section = await Section.findById(sectionId)
        if (!section) {return res.status(404).json({ message: 'Section not found' })}

        const index = section.roster.indexOf(studentId)
        if (index !== -1) {section.roster.splice(index, 1)}

        await Student.findByIdAndUpdate(studentId, { $pull: { enrolledSections: sectionId } })

        await section.save()

        res.status(200).json({message: `Student Removed From Section`})
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to remove student from section'})
    }
}
module.exports.getRoster = async (req,res) => 
{
    try{
        const { sectionId } = req.params

        const section = await Section.findById(sectionId).populate('roster', 'name email erp')
        if (!section) {return res.status(404).json({ message: 'Section not found' })}

        res.status(200).json({data: section.roster}) 
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get roster'})
    }
}
module.exports.getClasses = async (req,res) => 
{
    const teacher = req.body.decodedToken.id

    try{

        const teacherRecord = await Teacher.findById(teacher).populate
        ({
            path: 'classes',
            select: 'className sections',
            populate: 
            {
                path: 'sections',
                select: 'sectionName'
            }
        })
        if (!teacherRecord) {return res.status(404).json({ message: 'Teacher not found' })}

        res.status(200).json({data: teacherRecord.classes})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get classes'})
    }
}