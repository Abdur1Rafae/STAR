import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAssessments = async() => {
    const res = await AxiosBase.get('teacherhub/assessment-management/scheduled-assessments', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

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
    const transformedQuestion = {...question}
    delete transformedQuestion['options']
    const res = await AxiosBase.post(`teacherhub/question-bank/add-question/${assessmentId}`,{
        question: transformedQuestion,
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
    const { _id, ...newQuestion } = question;
    const res = await AxiosBase.put(`teacherhub/question-bank/update-reused-question/${assessmentId}/${_id}`,{
        question: newQuestion,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const AddReuseQuestion = async({assessmentId, questions}) => {
    const res = await AxiosBase.post(`teacherhub/question-bank/add-reused-questions/${assessmentId}`,{
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
    console.log(questions)
    const res = await AxiosBase.put(`teacherhub/question-bank/update-order/${assessmentId}`,{
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
    const res = await AxiosBase.get(`teacherhub/question-bank/all-questions`,{
        params:{
            skill: skill == "All" ? null : skill,
            topic: topic == "All" ? null : topic,
            difficulty: difficulty == "All" ? null : difficulty,
            type: type == "All" ? null : type
        },
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const MonitorAssessment = async({id}) => {
    console.log(id)
    const res = await AxiosBase.get(`assesshub/monitor/monitor-assessment/6613875b0c0e21848981ad7e`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const UpdateAssessment = async({id, name, description, sections, image, openDate, closeDate, duration, adaptiveTesting, monitoring,
    instantFeedback, navigation, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore}) => {
    const res = await AxiosBase.put(`teacherhub/assessment-management/update-assessment/${id}`,{
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

const GetAllTopics = async() => {
    const res = await AxiosBase.get(`teacherhub/question-bank/all-topics`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

export {GetAllTopics, GetAssessments, CreateAssessment, AddQuestion, UpdateQuestion, DeleteQuestion, AddReuseQuestion, UpdateReuseQuestion,DeleteReuseQuestion, UpdateOrder, GetStoredQuestions, GetReuseQuestions, MonitorAssessment, UpdateAssessment}