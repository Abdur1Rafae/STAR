import { AxiosBase } from '../BaseUrl';

// const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAllReports = async() => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get('/reporthub/teacher/reports', {
        headers: {
            authorization: `Bearer ${token}`
        }
    }) 

    return res.data.data
}

const GetReportsOverview = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`/reporthub/teacher/overview/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }) 

    return res.data
}

const GetResponses = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`/reporthub/teacher/individual-response/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }) 


    return res.data
}

const GetQuestionStats = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`/reporthub/teacher/question-summary/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }) 


    return res.data
}



export {GetAllReports, GetReportsOverview, GetResponses, GetQuestionStats}