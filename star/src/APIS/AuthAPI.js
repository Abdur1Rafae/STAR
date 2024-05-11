import { AxiosBase } from "./BaseUrl";

const UserLogin = async({email, password, role}) => {
    const res = await AxiosBase.post('session/login',{
        email: email,
        password: password,
        role: role
    })

    return res
}

export {UserLogin}