import { AxiosBase } from '../BaseUrl';

// const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAssessmentSummary = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/summary/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GetAssessmentResponses = async({id, assessmentId}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/responses/${assessmentId}/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GradeResponse = async({submissionId, responseId, score, feedback}) => {
    const token = sessionStorage.getItem('token')
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

const PenalizeResponse = async({responseId, penalty}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.put(`/teacherhub/grade/penalize-response/${responseId}`,{
        penalty: penalty
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const PublishAssessment = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.put(`/teacherhub/grade/publish/${id}`,{},{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const FlaggedStudents = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/flagging-summary/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GetFlagDetails = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/candidate-violations/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

export {PenalizeResponse, GetFlagDetails, FlaggedStudents, GetAssessmentSummary, GetAssessmentResponses, GradeResponse, PublishAssessment}