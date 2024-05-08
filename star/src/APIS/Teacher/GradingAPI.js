import { AxiosBase } from '../BaseUrl';

// const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAssessmentSummary = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/summary/6613875b0c0e21848981ad7e`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GetAssessmentResponses = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/grade/responses/${id}`, {
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

export {GetAssessmentSummary, GetAssessmentResponses, GradeResponse}