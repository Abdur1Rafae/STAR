import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAllReports = async() => {
    const res = await AxiosBase.get('/reporthub/teacher/reports', {
        headers: {
            authorization: `Bearer ${token}`
        }
    }) 

    return res.data.data
}

const GetReportsOverview = async({id}) => {
    const res = await AxiosBase.get(`/reporthub/teacher/overview/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }) 

    return res.data
}

const GetResponses = async({id}) => {
    const res = await AxiosBase.get(`/reporthub/teacher/individual-response/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }) 


    return res.data
}



export {GetAllReports, GetReportsOverview, GetResponses}