import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_STUDENT_TOKEN

const GetOngoingAssessments = async () => {
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

export {GetOngoingAssessments, GetUpcomingAssessments}