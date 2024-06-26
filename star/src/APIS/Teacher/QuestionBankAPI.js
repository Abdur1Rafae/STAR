import { AxiosBase } from '../BaseUrl';

// const token = process.env.REACT_APP_ACCESS_TOKEN

const GetAllQuestionBanks = async() => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get('/teacherhub/question-bank/all-banks', {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data.data
}

const GetQuestionsOfQB = async({id}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.get(`/teacherhub/question-bank/questions/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res.data
}

export {GetAllQuestionBanks, GetQuestionsOfQB}