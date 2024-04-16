import { AxiosBase } from '../BaseUrl';

const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAllQuestionBanks = async() => {
    const res = await AxiosBase.get('/teacherhub/question-bank/all-banks', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

export {GetAllQuestionBanks}