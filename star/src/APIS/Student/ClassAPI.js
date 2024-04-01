import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_STUDENT_TOKEN

const GetEnrolledClasses = async () => {
    const res = await AxiosBase.get(`edumanage/class/enrolled-classes`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data;
};

export {GetEnrolledClasses}