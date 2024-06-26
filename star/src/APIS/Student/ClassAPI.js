import { AxiosBase } from '../BaseUrl';

// const token = process.env.REACT_APP_STUDENT_TOKEN

const GetEnrolledClasses = async () => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`reporthub/student/classes`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data;
};

const GetClassOverview = async ({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`reporthub/student/classes/overview/${id}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data;
};

export {GetEnrolledClasses, GetClassOverview}