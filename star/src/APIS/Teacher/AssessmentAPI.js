import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_ACCESS_TOKEN

const CreateAssessment = async({name, description, sections, image, openDate, closeDate, duration, adaptiveTesting, monitoring,
    instantFeedback, navigation, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore}) => {
    console.log(name)
    console.log("here")
    const res = await AxiosBase.post('teacherhub/assessment-management/new-assessment',{
        title: name,
        description: description,
        participants : sections,
        configurations : 
        {
            openDate: openDate,
            duration: duration,
            closeDate: closeDate,
            adaptiveTesting: adaptiveTesting,
            monitoring: monitoring,
            instantFeedback: instantFeedback,
            navigation: navigation,
            releaseGrades: releaseGrades,
            viewSubmission: viewSubmission,
            randomizeQuestions: randomizeQuestions,
            randomizeAnswers: randomizeAnswers,
            finalScore: finalScore
        }
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

export {CreateAssessment}