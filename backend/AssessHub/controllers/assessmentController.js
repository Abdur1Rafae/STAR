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

        const questions = await Assessment.findById(assessmentId)
        .select('questionBank.question -_id')
        .populate({
            path: 'questionBank.question',
            select: '-teacher -__v',
            model: Question
        })

      if (!questions) {return res.status(201).json({data: []})}

      const formattedData = questions.questionBank.map(item => ({
        ...item.question.toObject(),
        reuse: item.reuse
      }))

      res.status(201).json({data: formattedData})

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
                  path: 'questionBank.question',
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
              const assessmentData = 
              {
                id : assessment._id,
                title: assessment.title,
                description : assessment.description,
                teacher: assessment.teacher.firstName + " " + assessment.teacher.lastName,
                className: section.class.className,
                totalMarks: assessment.questionBank.reduce((total, questionObj) => {return total + (questionObj.question ? questionObj.question.points : 0)}, 0),
                totalQuestions: assessment.questionBank.length,
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