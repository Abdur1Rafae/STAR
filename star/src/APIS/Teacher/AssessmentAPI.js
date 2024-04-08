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

const UpdateQuestion = async({question}) => {
    console.log(question)
    const res = await AxiosBase.put(`teacherhub/question-bank/update-question/${question._id}`,{
        question: question,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const DeleteQuestion = async({questionId, assessmentId}) => {
    const res = await AxiosBase.delete(`teacherhub/question-bank/delete-question/${assessmentId}/${questionId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const UpdateReuseQuestion = async({assessmentId, question}) => {
    const res = await AxiosBase.put(`teacherhub/question-bank/update-reused-question/${assessmentId}/${question._id}`,{
        question: question,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const AddReuseQuestion = async({assessmentId, questions}) => {
    const res = await AxiosBase.post(`teacherhub/question-bank/update-reused-question/${assessmentId}`,{
        reusedQuestions: questions,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const DeleteReuseQuestion = async({questionId, assessmentId}) => {
    const res = await AxiosBase.delete(`teacherhub/question-bank/delete-reused-question/${assessmentId}/${questionId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const UpdateOrder = async({questions, assessmentId}) => {
    const res = await AxiosBase.put(`teacherhub/question-bank/delete-reused-question/${assessmentId}`,{
        order: questions
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const GetStoredQuestions = async({assessmentId}) => {
    const res = await AxiosBase.get(`teacherhub/question-bank/questions/${assessmentId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GetReuseQuestions = async({skill, topic, difficulty, type}) => {
    console.log(token)
    const res = await AxiosBase.get(`teacherhub/question-bank/all-questions`,{
        skill: skill,
        topic: topic,
        difficulty: difficulty,
        type: type
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

export {CreateAssessment, AddQuestion, UpdateQuestion, DeleteQuestion, AddReuseQuestion, UpdateReuseQuestion,DeleteReuseQuestion, UpdateOrder, GetStoredQuestions, GetReuseQuestions}