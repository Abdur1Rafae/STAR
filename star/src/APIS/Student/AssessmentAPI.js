import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_STUDENT_TOKEN

const GetOngoingAssessments = async () => {
    console.log(token)
    const res = await AxiosBase.get(`assesshub/assessment/ongoing-assessments`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data;
};

const GetUpcomingAssessments = async () => {
    const res = await AxiosBase.get(`assesshub/assessment/upcoming-assessments`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data;
};

const GetAssessmentQuestions = async({id, sectionId}) => {
    console.log(id, sectionId)
    const res = await AxiosBase.get(`assesshub/assessment/begin-assessment/${sectionId}/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    console.log(res)

    return res.data;
}

const SubmitAssessment = async({responses}) => {
    const id = localStorage.getItem('responseId')
    const res = await AxiosBase.post(`assesshub/assessment/submit-response/${id}`,{
        submission: responses
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
}

export {GetOngoingAssessments, GetUpcomingAssessments, GetAssessmentQuestions, SubmitAssessment}