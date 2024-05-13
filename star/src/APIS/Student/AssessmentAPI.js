import { AxiosBase } from '../BaseUrl';

const GetOngoingAssessments = async () => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`assesshub/assessment/ongoing-assessments`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data;
};

const GetUpcomingAssessments = async () => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`assesshub/assessment/upcoming-assessments`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data;
};

const GetAssessmentQuestions = async({id, sectionId}) => {
    const token = localStorage.getItem('token')
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
    const token = localStorage.getItem('token')
    const res = await AxiosBase.post(`assesshub/assessment/submit-response/${id}`,{
        submission: responses
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res;
}

const GetAssessmentSummary = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`reporthub/student/classes/assessment-report/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
}

const GetSubmission = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.get(`reporthub/student/classes/assessment-submission/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
}

const LaunchAssessment = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.put(`teacherhub/assessment-management/launch-assessment/${id}`,{},{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
}

const DraftAssessment = async({id}) => {
    const token = localStorage.getItem('token')
    const res = await AxiosBase.put(`teacherhub/assessment-management/draft-assessment/${id}`,{},{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
}

export {DraftAssessment, GetSubmission, GetOngoingAssessments, GetUpcomingAssessments, GetAssessmentQuestions, SubmitAssessment, GetAssessmentSummary, LaunchAssessment}