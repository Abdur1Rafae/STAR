import { AxiosBase } from "./BaseUrl";

const UserLogin = async({email, password}) => {
    const res = await AxiosBase.post('session/login',{
        email: email,
        password: password,
    })

    return res
}

export {UserLogin}