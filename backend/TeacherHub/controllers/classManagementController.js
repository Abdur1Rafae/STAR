const conn = require('../dbconfig/dbcon')
const Joi = require('joi')
const {Section, Class, User} = require('library/index')

module.exports.createClass = async (req,res) => 
{
    try{
        const teacher = req.body.decodedToken.id
        var {className} = req.body

        const session = await conn.startSession()
        const insertId = await session.withTransaction(async () => 
        {
            const newClass = await Class.create([{className, teacher}], {session})

            const updatedTeacher = await User.findByIdAndUpdate(teacher, { $push: { classes: newClass[0] } }, { new: false }, {session})
            if(!updatedTeacher){throw new Error('Teacher not found')}

            return newClass[0]._id
        })
        session.endSession()

        return res.status(200).json({classId: insertId, message: `Class Created Successfully`})  
    }
    catch(err){
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        else if(err.message === 'Teacher not found'){return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })}
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create class'})}
}
module.exports.deleteClass = async (req,res) => 
{
    try{
        const teacher = req.body.decodedToken.id
        const {classId} = req.params

        const deletedClass = await Class.findByIdAndDelete(classId)
        if(!deletedClass){throw new Error('Class not found')}

        return res.status(200).json({message: `Class Deleted Successfully`}) 
    }
    catch(err){
        if(err.message === 'Teacher not found' || err.message === 'Class not found'){return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })}
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to delete class'})
    }
}
module.exports.updateClass = async (req,res) => 
{
    const {className} = req.body
    if(!className){return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required : Class Name'})}   

    try{
        const {classId} = req.params

        const updatedClass = await Class.findByIdAndUpdate(classId, { className })
        if(!updatedClass){return res.status(404).json({error: 'ER_NOT_FOUND', message: `Class not found`}) }

        return res.status(200).json({message: `Class Updated Successfully`})     
    }
    catch(err){return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to update class'})}
}

module.exports.createSection = async (req,res) => 
{
    try{
        const {classId} = req.params
        const{sectionName} = req.body
        
        const session = await conn.startSession()
        const insertId = await session.withTransaction(async () => 
        {
            const newSection = await Section.create([{sectionName, class: classId}], {session})
            const updatedClass = await Class.findByIdAndUpdate(classId, { $push: { sections: newSection[0] } }, { new: false }, {session})

            if(!updatedClass){throw new Error('Class not found')}

            return newSection[0]._id
        })
        session.endSession()

        return res.status(200).json({sectionId: insertId, message: `Section Created Successfully`})  
    }
    catch(err){
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        else if(err.message === 'Class not found'){return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })}
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create section'})}
}
module.exports.deleteSection = async (req,res) => 
{
    try{
        const { sectionId } = req.params

        const deletedSection = await Section.findByIdAndDelete(sectionId)
        if(!deletedSection){throw new Error('Section not found')}

        return res.status(200).json({message: `Section Deleted Successfully`})
    }
    catch(err){
        if(err.message === 'Class not found' || err.message === 'Section not found'){return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })}
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to delete section'})
    }
}
module.exports.updateSection = async (req,res) => 
{
    const {sectionName} = req.body
    if(!sectionName){return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required : Section Name' })}    

    try{
        const {sectionId}  = req.params
        
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName })
        if(!updatedSection){return res.status(404).json({error: 'ER_NOT_FOUND', message: `Section not found`}) }

        return res.status(200).json({message: `Section Updated Successfully`})        
    }
    catch(err){
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
                const role = 'student'

                const updateOp = {
                    updateOne: 
                    {
                        filter: { email },
                        update: 
                        {
                            $addToSet: { enrolledSections: sectionId },
                            $setOnInsert: { name, erp, role }
                        },
                        upsert: true
                    }
                }

                bulkOps.push(updateOp)
            }

            const result = await User.bulkWrite(bulkOps, {session})

            const upsertedIds = Object.values(result.upsertedIds || {})

            let modifiedIds = []

            if (result.modifiedCount > 0) 
            {
                let modifiedEmails = []
                modifiedEmails.push(...bulkOps.map(op => op.updateOne.filter.email))
                const modifiedStudents = await User.find({ email: { $in: modifiedEmails } }, { _id: 1 })
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
         if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to add students to section'})
    }
}
module.exports.removeStudentFromSection = async (req,res) => 
{    
    try{
        const { sectionId, studentId } = req.params
        
        const section = await Section.findById(sectionId)
        if (!section) {return res.status(404).json({ error : 'ER_NOT_FOUND', message: 'Section not found' })}

        const index = section.roster.indexOf(studentId)
        if (index !== -1) {section.roster.splice(index, 1)}

        const removedStudent = await User.findByIdAndUpdate(studentId, { $pull: { enrolledSections: sectionId } })
        if (!removedStudent) {return res.status(404).json({ error : 'ER_NOT_FOUND', message: 'Student not found' })}        

        await section.save()

        res.status(200).json({message: `Student Removed From Section`})
        
    }
    catch(err){
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to remove student from section'})
    }
}

module.exports.getRoster = async (req,res) => 
{
    try{
        const { sectionId } = req.params

        const section = await Section.findById(sectionId).populate('roster', 'name email erp')
        if (!section) {return res.status(404).json({ error : 'ER_NOT_FOUND', message: 'Section not found' })}

        res.status(200).json({data: section.roster}) 
    }
    catch(err){
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get roster'})
    }
}
module.exports.getClasses = async (req,res) => 
{
    const teacher = req.body.decodedToken.id

    try{

        const teacherRecord = await User.findById(teacher).populate
        ({
            path: 'classes',
            select: 'className sections',
            populate: 
            {
                path: 'sections',
                select: 'sectionName'
            }
        })
        if (!teacherRecord) {return res.status(404).json({ error : 'ER_NOT_FOUND', message: 'Teacher not found' })}

        if(!teacherRecord.classes){return res.status(200).json({data: []})}

        return res.status(200).json({data: teacherRecord.classes})
    }
    catch(err){
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get classes'})
    }
}