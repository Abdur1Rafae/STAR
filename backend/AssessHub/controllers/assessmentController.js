const conn = require('../dbconfig/dbcon')
const {Assessment, Question, User, Response} = require('library/index')

module.exports.beginAssessment = async (req,res) => 
{
  try
  {
    const student = req.body.decodedToken.id
    const {assessmentId, sectionId} = req.params

    const session = await conn.startSession()
    await session.withTransaction(async () => 
    {
      await Response.create([{student, assessment: assessmentId, section: sectionId}], {session})
      const updatedStudent = await User.findByIdAndUpdate( student,{ $addToSet: { attemptedAssessments : assessmentId } }, {session})
      if (!updatedStudent) {throw new Error('Student not found')}
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

    res.status(201).json({responseId: response._id, questions: formattedData})

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
    
    const updatedResponse = await Response.findByIdAndUpdate(responseId, response)

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
            select: '_id title description configurations coverImage status totalMarks',
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