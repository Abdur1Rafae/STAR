const conn = require('../dbconfig/dbcon')
const {Assessment, Question, Student, Response} = require('library/index')

module.exports.beginAssessment = async (req,res) => 
{
  try
  {
    //const student = req.body.decodedToken.id
    const student = '6609c24b69f531c541e8b651'
    const {assessmentId, sectionId} = req.params

    const response = await Response.findOneAndUpdate
    (
      { student, assessment: assessmentId },
      { $setOnInsert: { student, assessment: assessmentId, section: sectionId } },
      { upsert: true, new: true }
    )

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
    //const student = req.body.decodedToken.id
    const student = '6609c24b69f531c541e8b651'
    const {responseId} = req.params
    const {submission} = req.body

    const session = await conn.startSession()
    await session.withTransaction(async () => 
    {

      const response = {responses: submission, status: 'Submitted'}
      const updatedResponse = await Response.findByIdAndUpdate(responseId, response, {session})

      if (!updatedResponse) {throw new Error('Response not found')}

      const assessmentId = updatedResponse.assessment

      const updatedStudent = await Student.findByIdAndUpdate( 
        student,
        { $addToSet: { attemptedAssessments : assessmentId } }
      , {session})

      if (!updatedStudent) {throw new Error('Student not found')}

    })
    session.endSession()

    res.status(201).json({message: 'Response recorded successfully'})

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

      //const student = req.body.decodedToken.id
      const student = '6609c05b69f531c541e366a0'

      const assessments = await Student.findById(student)
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
                match: { 'configurations.openDate': { $gt: new Date() } },
                model: Assessment
            }
        ]
      })

      const data = []
      assessments.enrolledSections.forEach(section => {
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
    //const student = req.body.decodedToken.email
    const student = '6609c24b69f531c541e8b651'

    const assessments = await Student.findById(student)
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
            select: '_id title description configurations coverImage',
            match: 
            { 
              'configurations.openDate': { $lt: new Date() },
              'configurations.closeDate': { $gt: new Date() }
            },
            populate: 
            [
              {
                path: 'teacher',
                select: 'firstName lastName -_id'
              },
              {
                path: 'questionBank.question',
                select: 'points -_id'
              }
            ],
            model: Assessment
        },
      ]
    })
  
    const data = []
    assessments.enrolledSections.forEach(section => 
    {
        section.assessments.forEach(assessment => 
          {
            if(!assessments.attemptedAssessments.includes(assessment._id))
            {
              const assessmentData = 
              {
                sectionId: section._id,
                assessmentId : assessment._id,
                title: assessment.title,
                description : assessment.description,
                teacher: assessment.teacher.firstName + " " + assessment.teacher.lastName,
                className: section.class.className,
                totalMarks: assessment.questionBank.reduce((total, questionObj) => {return total + (questionObj.question ? questionObj.question.points : 0)}, 0),
                totalQuestions: assessment.questionBank.length,
                coverImage: assessment.coverImage,
                configurations:  assessment.configurations,
              }
              data.push(assessmentData)
            }
        })
    })

    res.status(200).json({data: data})  
  }
  catch(err){
      console.log(err)
      res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get upcoming assessments'})
  } 
}