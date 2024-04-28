const {Assessment, Response, Student, Section} = require('library/index')
const mongoose = require('mongoose')

function skillBreakDown(skills, response)
{
    response.forEach(response => 
    {
        if (!skills[response.questionId.skill]) {
            skills[response.questionId.skill] = { total: 0, score: 0 }
        }
        skills[response.questionId.skill].total += response.questionId.points
        skills[response.questionId.skill].score += response.score
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
                select: 'title status totalMarks',
                model: Assessment
            }
        ) 

        const responses = []
        let skills = {}

        for (const assessment of section.assessments) 
        {
            const assessmentData = {}

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

            assessmentData.title = assessment.title
            assessmentData.totalMarks = assessment.totalMarks
            assessmentData.submitted = response? response.submittedAt:null

            if(response && assessment.status === 'Published')
            {
                assessmentData.responseId = response._id
                assessmentData.totalScore = response.totalScore
                skills = skillBreakDown(skills, response.responses)
            }

            responses.push(assessmentData);
        }

        res.status(201).json({responses, skills})

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
        .select('responses createdAt submittedAt previousScore previousTotal') 
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

        let previousScore = response.previousScore
        let previousTotal = response.previousTotal

        if(!previousScore)
        {
            const student = response.student
            const section = response.section
            const assessment = response.assessment

            previousAssessment = await Response.aggregate
            ([
                {
                  $match: 
                  {
                    section: new mongoose.Types.ObjectId(section),
                    student: new mongoose.Types.ObjectId(student),
                    assessment: { $ne: new mongoose.Types.ObjectId(assessment) }
                  }
                },
                {
                  $lookup: 
                  {
                    from: "assessments",
                    localField: "assessment",
                    foreignField: "_id",
                    pipeline:[{$project: {status: 1, 'totalMarks': 1}}],
                    as: "assessment"
                  }
                },
                {$unwind: '$assessment'},
                {
                  $match: {
                    _id: { $lt: new mongoose.Types.ObjectId(assessment)},
                    "assessment.status": "Published"
                  }
                },
                {
                  $project: {
                    totalScore: '$totalScore',
                    totalMarks: '$assessment.totalMarks'
                  }
                }
              ]);
           
            previousScore = previousAssessment.length > 0 ? previousAssessment[0].totalScore : null
            previousTotal = previousAssessment.length > 0 ? previousAssessment[0].totalMarks : null

            response.previousScore = previousScore
            response.previousTotal = previousTotal
            response.save()      
        }

        const formattedData =
        {
            duration: response.assessment.configurations.duration,
            submiittedAt: response.submittedAt,
            createdAt: response.createdAt,
            previousScore: response.previousScore,
            previousTotal: response.previousTotal,
            responses: response.responses.map( item => 
                ({
                    topic: item.questionId.topic,
                    skill: item.questionId.skill,
                    points: item.questionId.points,
                    earned: item.score
                }))


        }

        res.status(201).json({data: formattedData})

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

        if (!response) {return res.status(404).json({ error: "ER_NOT_FOUND", message: 'Assessment not found' })}

        if(response.assessment.configurations.viewSubmission === false){return res.status(405).json({ message: 'Not allowed to view submission' })}

        response = await Response.findById(responseId)
        .select('responses')
        .populate({
            path: 'responses.questionId',
            select: '-teacher -__v '
        })

        res.status(201).json({data: response})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to generate question report'})
    }
}