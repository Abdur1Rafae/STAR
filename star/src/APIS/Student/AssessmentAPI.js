import { AxiosBase } from '../BaseUrl';

const GetOngoingAssessments = async () => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`assesshub/assessment/ongoing-assessments`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data;
};

const GetUpcomingAssessments = async () => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`assesshub/assessment/upcoming-assessments`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data;
};

const GetAssessmentQuestions = async({id, sectionId}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`assesshub/assessment/begin-assessment/${sectionId}/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    console.log(res)

    return res.data;
}

const SubmitAssessment = async({responses, action, adaptiveTesting, showFinalScore, totalScore}) => {
    const id = localStorage.getItem('responseId')
    const token = sessionStorage.getItem('token')
    console.log(showFinalScore)
    const res = await AxiosBase.post(`assesshub/assessment/submit-response/${id}`,{
        submission: responses,
        action: action,
        adaptiveTesting: adaptiveTesting,
        finalScore: showFinalScore,
        totalScore: totalScore
    },{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res;
}

const GetAssessmentSummary = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`reporthub/student/classes/assessment-report/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
}

const GetSubmission = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`reporthub/student/classes/assessment-submission/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
}

const SaveAssessment = async({id, status, stoppingCriteria, totalMarks}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.put(`teacherhub/assessment-management/save-assessment/${id}`, {
        status: status,
        stoppingCriteria: stoppingCriteria,
        totalMarks: totalMarks
    }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

const FlagStudents = async({data, id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.put(`assesshub/monitor/flag-candidate/${id}`,data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    console.log(res.data)
}

export {SaveAssessment, FlagStudents, GetSubmission, GetOngoingAssessments, GetUpcomingAssessments, GetAssessmentQuestions, SubmitAssessment, GetAssessmentSummary}