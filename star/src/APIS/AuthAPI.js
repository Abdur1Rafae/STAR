import { AxiosBase } from "./BaseUrl";

const UserLogin = async({email, password}) => {
    const res = await AxiosBase.post('session/login',{
        email: email,
        password: password,
    })

    return res
}

const UserLogout = async() => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.post('session/logout',{},{
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    return res
}

const UserSignup = async({obj}) => {
    const res = await AxiosBase.post('userguardian/signup', obj)
    return res
}

const ForgotPassword = async({email}) => {
    const res = await AxiosBase.post('session/forgot-password', {email: email})
    return res
}

const VerifyOtp = async({email, otp}) => {
    const res = await AxiosBase.post('session/verify-OTP', {email: email, otp: otp})
    return res
}

const resetPassword = async({email, password}) => {
    const res = await AxiosBase.put('userguardian/reset-password', {email: email, password: password})
    return res
}

const UpdateProfile = async({newPass, currPass}) => {
    const token = sessionStorage.getItem('token')
    const res = await AxiosBase.put('userguardian/update-profile', {newPassword: newPass, currentPassword: currPass},{
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res
}

const DemoAssessmentEnrollment = async({name, email, role}) => {
    const res = await AxiosBase.post('assesshub/assessment/demo-assessment', {name: name, email: email, role: role},{})
    return res
}

export {UserLogin, UserLogout, UserSignup, ForgotPassword, VerifyOtp, resetPassword, UpdateProfile, DemoAssessmentEnrollment}