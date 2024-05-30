import { AxiosBase } from '../BaseUrl';

// const token = process.env.REACT_APP_ACCESS_TOKEN


const GetAssessments = async() => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get('teacherhub/assessment-management/scheduled-assessments', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const DeleteAssessment = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.delete(`teacherhub/assessment-management/delete-assessment/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const CreateAssessment = async({name, description, sections, image, openDate, closeDate, duration, adaptiveTesting, monitoring,
    instantFeedback, navigation, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore}) => {
        const token = sessionStorage.getItem('token')
        console.log(new Date(openDate), new Date(closeDate))
    const res = await AxiosBase.post('teacherhub/assessment-management/new-assessment',{
        title: name,
        description: description,
        participants : sections,
        coverImage:image,
        configurations : 
        {
            openDate: new Date(openDate),
            duration: duration,
            closeDate: new Date(closeDate),
            adaptiveTesting: {
                active: adaptiveTesting,
                totalMarks: 0,
                stoppingCriteria: 0
            },
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
    const token = sessionStorage.getItem('token')
    if(question.type == "True/False") {
        question.options = ["True", "False"]
    }
    const res = await AxiosBase.post(`teacherhub/question-bank/add-question/${assessmentId}`,{
        question: question,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const UpdateQuestion = async({id, question}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.put(`teacherhub/question-bank/update-question/${id}/${question._id}`,{
        question: question,
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const DeleteQuestion = async({questionId, assessmentId}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.delete(`teacherhub/question-bank/delete-question/${assessmentId}/${questionId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const UpdateReuseQuestion = async({assessmentId, question}) => {
    const token = sessionStorage.getItem('token')
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
    const token = sessionStorage.getItem('token')
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
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.delete(`teacherhub/question-bank/delete-reused-question/${assessmentId}/${questionId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const UpdateOrder = async({questions, assessmentId}) => {
    const token = sessionStorage.getItem('token')
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
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`teacherhub/question-bank/questions/${assessmentId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const GetReuseQuestions = async({skill, topic, difficulty, type}) => {
    const token = sessionStorage.getItem('token')
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
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`assesshub/monitor/monitor-assessment/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const UpdateAssessment = async({id, name, description, sections, image, openDate, closeDate, duration, adaptiveTesting, monitoring,instantFeedback, navigation, releaseGrades, viewSubmission, randomizeQuestions, randomizeAnswers, finalScore, stoppingCriteria, totalMarks}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.put(`teacherhub/assessment-management/update-assessment/${id}`,{
        title: name,
        description: description,
        participants : sections,
        coverImage:image,
        configurations : 
        {
            openDate: new Date(openDate),
            duration: duration,
            closeDate: new Date(closeDate),
            adaptiveTesting: {
                active: adaptiveTesting,
                totalMarks: adaptiveTesting ? totalMarks : null,
                stoppingCriteria: adaptiveTesting ? stoppingCriteria : null
            },
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
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`teacherhub/question-bank/all-topics`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

export {DeleteAssessment, GetAllTopics, GetAssessments, CreateAssessment, AddQuestion, UpdateQuestion, DeleteQuestion, AddReuseQuestion, UpdateReuseQuestion,DeleteReuseQuestion, UpdateOrder, GetStoredQuestions, GetReuseQuestions, MonitorAssessment, UpdateAssessment}