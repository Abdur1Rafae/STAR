const Query = require('../db_manager/classQuery')
const executeQuery = require('../db_manager/dbconn')
const validateFields = require('../util/library')
const {sendMail} = require('../util/Mail/mail')

function validateStudentInfo(students)
{
    // Check if students is an array
    if (!Array.isArray(students)) {return false}

    // Check each student object
    for (const student of students) 
    {
        if (
        typeof student.firstName !== 'string' ||
        typeof student.lastName !== 'string' ||
        typeof student.email !== 'string' ||
        typeof student.erp !== 'number'
        ) 
        {return false}
    }
    return true
}

module.exports.createClass = async (req,res) => 
{
    const email = req.body.decodedToken.email

    const requiredFields = ['className']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    
    var {className} = req.body

    try{
        const result = await executeQuery(Query.INSERT_CLASS, [className, email])
        return res.status(200).json({classId: result.insertId, message: `Class Created Successfully`})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create class'})}
}
module.exports.deleteClass = async (req,res) => 
{
    console.log("here")
    const requiredFields = ['classId']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    
    var {classId} = req.body

    try{
        const result = await executeQuery(Query.DELETE_CLASS, [classId])
        if(result.affectedRows > 0){return res.status(200).json({message: `Class Deleted Successfully`})}
        else{return res.status(404).json({error: 'ER_NOT_FOUND', message: `Class Not Found`})  }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Internal server error: Failed to delete class'})
    }
}
module.exports.updateClass = async (req,res) => 
{
    const email = req.body.decodedToken.email

    const requiredFields = ['className', 'classId']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    
    var {className, classId} = req.body

    try{
        const result = await executeQuery(Query.UPDATE_CLASS, [className, classId])
        if(result.changedRows > 0){return res.status(200).json({message: `Class Updated Successfully`})}
        else{return res.status(404).json({error: 'ER_NOT_FOUND', message: `Class Not Found`})  }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to update class'})
    }
}
module.exports.createSection = async (req,res) => 
{
    const requiredFields = ['classId', 'sectionName']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    
    var {classId, sectionName} = req.body

    try{
        const result = await executeQuery(Query.INSERT_SECTION, [sectionName, classId])
        return res.status(200).json({sectionId: result.insertId, message: `Section Created Successfully`})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to create section'})}
}
module.exports.deleteSection = async (req,res) => 
{
    const requiredFields = ['sectionId']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    
    var {sectionId} = req.body

    try{
        const result = await executeQuery(Query.DELETE_SECTION, [sectionId])
        if(result.affectedRows > 0){return res.status(200).json({message: `Section Deleted Successfully`})}
        else{return res.status(404).json({error: 'ER_NOT_FOUND', message: `Section Not Found`})  }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to delete section'})
    }
}
module.exports.updateSection = async (req,res) => 
{
    const requiredFields = ['sectionName', 'sectionId']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}   
    
    var {sectionName, sectionId} = req.body

    try{
        const result = await executeQuery(Query.UPDATE_SECTION, [sectionName, sectionId])
        if(result.changedRows > 0){return res.status(200).json({message: `Section Updated Successfully`})}
        else{return res.status(404).json({error: 'ER_NOT_FOUND', message: `Section Not Found`})  }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to update section'})
    }
}
module.exports.addStudents = async (req,res) => 
{
    const requiredFields = ['sectionId', 'students']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}  
    
    var {students, sectionId} = req.body
    if(!validateStudentInfo(students)){return res.status(400).json({ error: 'ER_INVLD_ARG', message: 'students must be an array and each student object must contain firstName, lastName, ERP, and email' })}

    const userValues = students.map(student => [student.email, student.firstName, student.lastName, 'Student', student.erp]);
    const enrollmentValues = students.map(student => [sectionId, student.email]);

    try{
        var result = await executeQuery(Query.ADD_STUDENTS, [userValues, enrollmentValues])
        res.status(200).json({studentsEnrolled: result[1].affectedRows, message: `Enrollment Complete`})  
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to add students to section'})
    }
}
module.exports.removeStudent = async (req,res) => 
{
    const requiredFields = ['sectionId', 'studentId']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}  
    
    var {studentId, sectionId} = req.body

    try{
        var result = await executeQuery(Query.REMOVE_STUDENT, [studentId,sectionId])
        result.status(200).json({message: `Student '${studentId}' Removed From Section '${sectionId}'`})
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to remove student from section'})
    }
}
module.exports.getRoster = async (req,res) => 
{
    const requiredFields = ["sectionId"]
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })}  
    
    var {sectionId} = req.body

    try{
        var result = await executeQuery(Query.GET_ROSTER, [sectionId])
        res.status(200).json({data: result})
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get roster'})
    }
}
module.exports.getClasses = async (req,res) => 
{
    const email = req.body.decodedToken.email

    try{
        var result = await executeQuery(Query.GET_CLASSES, [email])
        res.status(200).json({data: result})
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get classes'})
    }
}
module.exports.getEnrolledClasses = async (req,res) => 
{   
    const email = req.body.decodedToken.email

    try{
        var result = await executeQuery(Query.GET_ENROLLED_CLASSES, [email])
        res.status(200).json({data: result})
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get enrolled classes'})
    }
}
