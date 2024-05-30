const conn = require('../dbconfig/dbcon')
const {Assessment, Question, User, Response, Section} = require('library/index')
const mongoose = require('mongoose')

module.exports.beginAssessment = async (req,res) => 
{
  try
  {
    const student = req.body.decodedToken.id
    const {assessmentId, sectionId} = req.params

    const session = await conn.startSession()
    const id = await session.withTransaction(async () => 
    {
      const response = await Response.create([{student, assessment: assessmentId, section: sectionId}], {session})
      const updatedStudent = await User.findByIdAndUpdate( student,{ $addToSet: { attemptedAssessments : assessmentId } }, {session})
      if (!updatedStudent) {throw new Error('Student not found')}
      return response[0]._id
    })
    session.endSession()

    const assessment = await Assessment.findById(assessmentId)
    .select('questionBank.question -_id')
    .populate
    ({
        path: 'questionBank.question',
        select: '-teacher -__v',
        model: Question
    })

    if (!assessment) {return res.status(404).json({error: 'ER_NOT_FOUND', message: 'Assessment not found'})}

    const formattedData = assessment.questionBank.map( (item, index) => 
      ({
          ...item.question.toObject(),
          number: index + 1
    }))

    res.status(201).json({responseId: id, questions: formattedData})

  }
  catch (err) {
      console.log(err)
      res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to launch questions' })
  } 
}
module.exports.submitAssessment = async (req,res) => 
{
  try
  {
    const student = req.body.decodedToken.id
    const {responseId} = req.params
    const {action, adaptiveTesting, finalScore, totalScore, submission} = req.body

    let response = {responses: submission}

    if(action === 'submit'){response.status = 'Submitted'}  

    if(adaptiveTesting === true){response.totalScore = totalScore}
    
    const updatedResponse = await Response.findByIdAndUpdate(responseId, response, { new: true } )

    if (!updatedResponse) {throw new Error('Response not found')}

    let reply = {message: 'Response recorded successfully'}

    if(finalScore === true && action === 'submit'){reply.finalScore = updatedResponse.totalScore}

    return res.status(201).json(reply)

  }
  catch (err) {
      console.log(err)
      if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
      else if (err.message === 'Response not found' || err.message === 'Student not found') {return res.status(404).json({ error: 'ER_NOT_FOUND', message: err.message })} 
      res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to save response' })
  } 
}

module.exports.getUpcomingAssessments = async (req,res) => 
{
    try{

      const student = req.body.decodedToken.id

      const assessments = await User.findById(student)
      .select('-name -erp -email -_id -__v') 
      .populate
      ({
        path: 'enrolledSections',
        select: '-_id class assessments', 
        populate: 
        [
            {
                path: 'class', 
                select: '-_id className' 
            },
            {
                path: 'assessments', 
                select: '-_id title configurations.openDate configurations.closeDate configurations.duration',
                match: { 'configurations.openDate': { $gt: new Date() }, status: 'Launched' },
                model: Assessment
            }
        ]
      })

      if(!assessments.enrolledSections || assessments.enrolledSections.length === 0){return res.status(200).json({data: []})}

      const data = []
      assessments.enrolledSections.forEach(section => 
        {
          section.assessments.forEach(assessment => {
              const assessmentData = 
              {
                title : assessment.title,
                className: section.class.className,
                openDate: assessment.configurations.openDate,
                closeDate: assessment.configurations.closeDate,
                duration: assessment.configurations.duration,

              }
              data.push(assessmentData)
          })
      })

      res.status(200).json({data: data})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get upcoming assessments'})
    }
}
module.exports.getOngoingAssessments = async (req,res) => 
{
  try
  {
    const student = req.body.decodedToken.id
    
    const assessments = await User.findById(student)
    .select('-name -erp -email -_id -__v') 
    .populate
    ({
      path: 'enrolledSections',
      select: '_id class assessments', 
      populate: 
      [
        {
            path: 'class', 
            select: '-_id className' 
        },
        {
            path: 'assessments', 
            select: '_id title description configurations coverImage status totalMarks questionBank',
            match: 
            { 
              'configurations.openDate': { $lt: new Date() },
              'configurations.closeDate': { $gt: new Date() },
              status: 'Launched'
            },
            populate: 
            [
              {
                path: 'teacher',
                select: 'name -_id'
              }
            ],
            model: Assessment
        },
      ]
    })

    if(!assessments.enrolledSections || assessments.enrolledSections.length === 0){return res.status(200).json({data: []})}
  
    const data = []
    assessments.enrolledSections.forEach(section => 
    {
        section.assessments.forEach(assessment => 
          {
            if(!assessments.attemptedAssessments || !assessments.attemptedAssessments.includes(assessment._id))
            {
              const assessmentData = 
              {
                sectionId: section._id,
                assessmentId : assessment._id,
                title: assessment.title,
                description : assessment.description,
                teacher: assessment.teacher.name,
                className: section.class.className,
                totalMarks: assessment.configurations.adaptiveTesting.active === true ? assessment.configurations.adaptiveTesting.totalMarks : assessment.totalMarks,
                totalQuestions: assessment.configurations.adaptiveTesting.active === true ? assessment.configurations.adaptiveTesting.stoppingCriteria : assessment.questionBank.length,
                coverImage: assessment.coverImage,
                configurations:  assessment.configurations,
              }
              data.push(assessmentData)
            }
        })
    })

    return res.status(200).json({data: data})  
  }
  catch(err){
      console.log(err)
      res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get ongoing assessments'})
  } 
}

module.exports.demoAssessment = async (req,res) => 
  {
    try
    {
      const {name, email, role} = req.body

      const assessmentId = new mongoose.Types.ObjectId('66589502a72e7fdc274b8583')
      let sectionId

      const teacherSection = new mongoose.Types.ObjectId('6658464ba72e7fdc274b8577')
      const alumniSection = new mongoose.Types.ObjectId('66584572a72e7fdc274b8571')
      const expertSection = new mongoose.Types.ObjectId('66584569a72e7fdc274b856e')
      const studentSection = new mongoose.Types.ObjectId('66584643a72e7fdc274b8574')

      switch (role) {
        case 'teacher':
          sectionId = teacherSection;
          break;
        case 'alumni':
          sectionId = alumniSection;
          break;
        case 'expert':
          sectionId = expertSection;
          break;
        case 'student':
          sectionId = studentSection;
          break;
        default:
        sectionId = null;
      }

      if(sectionId === null){return res.status(400).json({error: 'ER_INVLD', message: 'Invalid user role'})}
  
      const session = await conn.startSession()
      const id = await session.withTransaction(async () => 
      {
        const newStudent = await User.create([{ name, email, role: 'student', enrolledSection: [sectionId], attemptedAssessments: [assessmentId] }],{ session })

        const section = await Section.findById(sectionId)
        section.roster.push(newStudent[0]._id)
        await section.save({session})

        const response = await Response.create([{student: newStudent[0]._id, assessment: assessmentId, section: sectionId}], {session})

        return response[0]._id
      })
      session.endSession()
  
      const assessment = await Assessment.findById(assessmentId)
      .select('title configurations totalMarks questionBank.question -_id')
      .populate
      ({
          path: 'questionBank.question',
          select: '-teacher -__v',
          model: Question
      })
  
      if (!assessment) {return res.status(404).json({error: 'ER_NOT_FOUND', message: 'Assessment not found'})}
  
      const formattedData = assessment.questionBank.map( (item, index) => 
        ({
            ...item.question.toObject(),
            number: index + 1
      }))
      const data = 
      {
        responseId: id,
        title: assessment.title,
        totalMarks: assessment.totalMarks,
        configurations: assessment.configurations,
        questions: formattedData
      }
  
      return res.status(201).json(data)
    }
    catch (err) 
    {
      console.log(err)
      if (err.code === 11000) {res.status(400).json({ error: 'ER_DUP' , message: 'User already exists.'})}
      else{res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to launch assessment' })}
    } 
  }

