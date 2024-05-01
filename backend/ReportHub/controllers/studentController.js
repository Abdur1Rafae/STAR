const {Assessment, Response, Student, Section} = require('library/index')
const mongoose = require('mongoose')

function skillBreakDown(skills, response)
{
    response.forEach(response => 
    {
        if (!skills[response.questionId.skill]) {
            skills[response.questionId.skill] = { total: 0, correct: 0 }
        }
        skills[response.questionId.skill].total++
        if(response.score === response.questionId.points){skills[response.questionId.skill].correct++}
    })

    return skills

}

module.exports.getEnrolledClasses = async (req,res) => 
{
    try
    {
        //const student = req.body.decodedToken.email
        const student = '6609c24b69f531c541e8b651'

        const classes = await Student.findById(student)
        .select('-name -erp -email -_id -__v') 
        .populate
        ({
            path: 'enrolledSections',
            select: 'class assessments createdAt', 
            populate: 
            {
                path: 'class', 
                select: '-_id className',
                populate:{ path: 'teacher', select: '-_id firstName lastName'} 
            },
        })

        const formattedData = classes.enrolledSections.map( section => 
        ({
            _id: section._id,
            className: section.class.className,
            assessment: section.assessments.length || 0,
            enrolled: section.createdAt,
            teacher: section.class.teacher.firstName + ' ' + section.class.teacher.lastName
        }))

        res.status(201).json({data: formattedData})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get enrolled classes'})
    }
}
module.exports.getClassOverview = async (req,res) => 
{
    try
    {
        //const student = req.body.decodedToken.email
        const student = '6609c24b69f531c541e8b651'
        const {sectionId} = req.params

        const section = await Section.findById(sectionId)
        .select('-_id assessments')
        .populate(
            {
                path: 'assessments',
                select: 'title status totalMarks configurations.openData configurations.closeDate configurations.duration',
                model: Assessment
            }
        ) 

        const responses = []
        let skills = {}

        for (const assessment of section.assessments) 
        {
            const assessmentData = {}

            assessmentData.title = assessment.title
            assessmentData.totalMarks = assessment.totalMarks



            if(assessment.configurations.closeDate < new Date())
            {
                const response = await Response.findOne
                ({
                    assessment: new mongoose.Types.ObjectId(assessment._id),
                    student: new mongoose.Types.ObjectId(student)
                })
                .select('responses.questionId responses.score totalScore submittedAt')
                .populate({
                    path: 'responses.questionId',
                    select: '-_id points skill'
                })

                if(response)
                {
                    if(assessment.status === 'Published')
                    {
                        assessmentData.status = 'Published'
                        assessmentData.responseId = response._id
                        assessmentData.submitted = response.submittedAt
                        assessmentData.totalScore = response.totalScore
                        skills = skillBreakDown(skills, response.responses)
                    }
                    else
                    {
                        assessmentData.status = 'Under Review'
                        assessmentData.submitted = response.submittedAt
                    }
                }
                else{assessmentData.status = 'Absent'}
            }
            else if(assessment.configurations.openDate > new Date())
            {
                assessmentData.status = 'Not Started'
                assessmentData.openDate = assessment.configurations.openDate
                assessment.closeDate = assessment.configurations.closeDate
                assessment.duration = assessment.configurations.duration
            }

            responses.push(assessmentData);
        }

        res.status(201).json({assessmentHistory: responses, skillsBreakDown:skills})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get class overview'})
    }
}
module.exports.getAssessmentReport = async (req,res) => 
{
    try
    {
        //const student = req.body.decodedToken.email
        const student = '6609c24b69f531c541e8b651'
        const {responseId} = req.params

        const response = await Response.findById(responseId)
        .select('responses createdAt submittedAt') 
        .populate
        ({
            path: 'assessment',
            select: 'configurations.duration -_id',
            model: Assessment
        })
        .populate({
            path: 'responses.questionId',
            select: 'topic skill points -_id'
        })

        const report =
        {
            duration: response.assessment.configurations.duration,
            submiittedAt: response.submittedAt,
            createdAt: response.createdAt,
            responses: response.responses.map( item => 
            {
                    const question =  
                    {
                        topic: item.questionId.topic,
                        skill: item.questionId.skill,
                        correct: 0
                    }
                    if(item.score === item.questionId.points){question.correct = 1}
                    else if(item.answer.length === 0 || item.answer === null){question.correct = -1}
                    return question
            })
        }

        res.status(201).json(report)

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to generate assessmentreport'})
    }
}
module.exports.getAssessmentSubmission = async (req,res) => 
{
    try
    {
        //const student = req.body.decodedToken.email
        const student = '6609c24b69f531c541e8b651'
        const {responseId} = req.params

        let response = await Response.findById(responseId)
        .select('assessment')
        .populate({
            path: 'assessment',
            select: 'configurations.viewSubmission',
            model: Assessment
        })

        if (!response) {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Response not found' })}

        if(response.assessment.configurations.viewSubmission === false){return res.status(405).json({ message: 'Not allowed to view submission' })}

        response = await Response.findById(responseId)
        .select('responses')
        .populate({
            path: 'responses.questionId',
            select: '-teacher -__v '
        })

        const submission = response.responses.map( item => 
        {
            let isCorrect = false
            if(item.score === item.questionId.points) {isCorrect = true}
            return {isCorrect, ...item.toObject()}

        })

        res.status(201).json({submission})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to get submission'})
    }
}