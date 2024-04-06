import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_ACCESS_TOKEN

const CreateAssessment = async({name, description, sections, image, openDate, closeDate, duration, adaptiveTesting, monitoring,
    instantFeedback, navigation, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore}) => {
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

const AddQuestion = async({assessmentId, question}) => {
    const res = await AxiosBase.post(`teacherhub/question-bank/add-question/${assessmentId}`,{
        question: question,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const UpdateQuestion = async({questionId, question}) => {
    const res = await AxiosBase.put(`teacherhub/question-bank/update-question/${questionId}`,{
        question: question,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const DeleteQuestion = async({questionId}) => {
    const res = await AxiosBase.delete(`teacherhub/question-bank/delete-question/${questionId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

export {CreateAssessment, AddQuestion, UpdateQuestion, DeleteQuestion}