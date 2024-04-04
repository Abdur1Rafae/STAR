const conn = require('../dbconfig/dbcon')
const Assessment = require('../models/Assessment')
const Class = require('../models/Class')
const Question = require('../models/Question')
const Student = require('../models/Student')
const Section = require('../models/Section')
const Teacher = require('../models/Teacher')

module.exports.getAssessmentQuestions = async (req,res) => 
{
    try
    {
        const {assessmentId} = req.params
        const assessment = await Assessment.findById(assessmentId)
        .select('questionBank.questions questionBank.reusedQuestions')
        .populate({
          path: 'questionBank.questions',
          model: Question
        })
        .populate({
          path: 'questionBank.reusedQuestions',
          model: Question
        })
      
        const allQuestions = 
        [
            ...assessment.questionBank.questions,
            ...assessment.questionBank.reusedQuestions
        ]

     if (!allQuestions) {return res.status(404).json({ error: 'ER_NOT_FOUND', message: 'Empty Question Bank' })}

        res.status(201).json({data: allQuestions})

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to get questions' })
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

      const data = [];
      assessments.enrolledSections.forEach(section => {
          section.assessments.forEach(assessment => {
              const assessmentData = 
              {
                title : assessment.title,
                className: section.class.className,
                openDate: assessment.configurations.openDate,
                closeDate: assessment.configurations.closeDate,
                duration: assessment.configurations.duration,

              };
              data.push(assessmentData);
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
                  path: 'questionBank.questions questionBank.reusedQuestions',
                  select: 'points'
                }
              ],
              model: Assessment
          },
        ]
      })
      
      const data = [];
      assessments.enrolledSections.forEach(section => 
      {
          section.assessments.forEach(assessment => 
            {
              const allQuestions = [...assessment.questionBank.questions, ...assessment.questionBank.reusedQuestions]
              const assessmentData = 
              {
                id : assessment._id,
                title: assessment.title,
                description : assessment.description,
                teacher: assessment.teacher.firstName + " " + assessment.teacher.lastName,
                className: section.class.className,
                totalMarks: allQuestions.reduce((total, question) => total + question.points, 0),
                totalQuestions: assessment.questionBank.questions.length + assessment.questionBank.reusedQuestions.length,
                coverImage: assessment.coverImage,
                configurations:  assessment.configurations,
              };
              data.push(assessmentData);
          })
      })

      res.status(200).json({data: data})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get upcoming assessments'})
    } 
}