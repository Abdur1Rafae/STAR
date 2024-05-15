import { AxiosBase } from '../BaseUrl';

// const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAssessmentSummary = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/summary/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GetAssessmentResponses = async({id, assessmentId}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/responses/${assessmentId}/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GradeResponse = async({submissionId, responseId, score, feedback}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.put(`/teacherhub/grade/grade-response/${submissionId}/${responseId}`,{
        score: score,
        feedback: feedback
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const PublishAssessment = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.put(`/teacherhub/grade/publish/${id}`,{},{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const FlaggedStudents = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/flagging-summary/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GetFlagDetails = async({id}) => {
    console.log(id)
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/candidate-violations/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

export {GetFlagDetails, FlaggedStudents, GetAssessmentSummary, GetAssessmentResponses, GradeResponse, PublishAssessment}