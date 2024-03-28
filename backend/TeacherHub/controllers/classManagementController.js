const conn = require('../dbconfig/dbcon')
const Joi = require('joi')
const validateFields = require('../util/library')
const Class = require('../models/ClassManagement')

module.exports.createClass = async (req,res) => 
{
    const teacherID = req.body.decodedToken.email
    
    var {className} = req.body

    try{
        const result = await Class.create({className, teacherID})
        return res.status(200).json({classId: result._id, message: `Class Created Successfully`})  
    }
    catch(err){
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create class'})}
}
module.exports.deleteClass = async (req,res) => 
{
    try{
        const {classId} = req.params
        await Class.findByIdAndDelete(classId)
        return res.status(200).json({message: `Class Deleted Successfully`}) 
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Internal server error: Failed to delete class'})
    }
}
module.exports.updateClass = async (req,res) => 
{
    const requiredFields = ['className']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   

    try{
        const {classId} = req.params
        const updatedClass = await Class.findByIdAndUpdate(classId, req.body)
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
    const requiredFields = ['sectionName']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   

    try{
        const {classId} = req.params
        const {sectionName} = req.body
        //const newSection = new Section({ sectionName })
        const updatedClass = await Class.findByIdAndUpdate(classId, { $push: { sections:  { sectionName } } }, { new: true })
        const newSectionId = updatedClass.sections[updatedClass.sections.length - 1]._id
        return res.status(200).json({sectionId: newSectionId, message: `Section Created Successfully`})  
    }
    catch(err){
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create section'})}
}
module.exports.deleteSection = async (req,res) => 
{
    try{
        const { classId, sectionId } = req.params
        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { $pull: { sections: { _id: sectionId } } }
          )
        return res.status(200).json({message: `Section Deleted Successfully`})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to delete section'})
    }
}
module.exports.updateSection = async (req,res) => 
{
    const requiredFields = ['sectionName']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   

    try{
        const {classId, sectionId}  = req.params
        const updatedClass = await Class.findOneAndUpdate(
            { _id: classId, "sections._id": sectionId },
            { $set: { "sections.$.sectionName": req.body.sectionName } }
          )
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
        const { classId, sectionId } = req.params

        const updatedClass = await Class.findOneAndUpdate(
            { _id: classId, 'sections._id': sectionId },
            { $push: { 'sections.$.roster': students } }
        )

        res.status(200).json({message: `Enrollment Complete`})  
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to add students to section'})
    }
}
module.exports.removeStudentFromSection = async (req,res) => 
{    
    try{
        const { classId, sectionId, studentId } = req.params
        const updatedClass = await Class.findOneAndUpdate(
            { _id: classId, 'sections._id': sectionId },
            { $pull: { 'sections.$.roster': { _id: studentId } } },
            { new: true }
        )
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
        const { classId, sectionId } = req.params
        Class.findOne({ _id: classId })
        .then(classDoc => {
            if (classDoc) {
                const section = classDoc.sections.find(sec => sec._id.equals(sectionId));
                if (section) {
                    res.status(200).json({data: section.roster})
                } else {
                    return res.status(404).json({ error: 'ER_NOT_FOUND', message: 'Section Not Found' })
                }
            } else {
                return res.status(404).json({ error: 'ER_NOT_FOUND', message: 'Class Not Found' })
            }
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get roster'})
    }
}
module.exports.getClasses = async (req,res) => 
{
    const teacherId = req.body.decodedToken.email

    try{
        const classes = await Class.find({ teacherID: teacherId }, { className: 1, _id: 1, "sections.sectionName": 1, "sections._id": 1 });
        res.status(200).json({data: classes})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get classes'})
    }
}