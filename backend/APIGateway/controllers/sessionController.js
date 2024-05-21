const jwt = require('jsonwebtoken')
const Joi = require('joi')
const uuid = require('uuid')
const axios = require('axios')
const getServiceURL = require('../microservice/services')
const client = require('../dbconfig/dbcon')

const ACCESS_TOKEN_EXPIRATION = '1y'
const REFRESH_TOKEN_EXPIRATION = '1y'
const AUTHENTICATION_SERVICE = 'userguardian'
const SESSION_HASH_KEY = 'SESSION_ID'

function createAccessToken(user, sessionId)
{
    return jwt.sign({id: user._id, role:user.role, sessionId}, process.env.JWT_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION})   
}
async function createSession(id)
{
    const sessionId = uuid.v4() 
    const refreshToken = jwt.sign({sessionId}, process.env.JWT_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRATION})   
    await client.hSet(SESSION_HASH_KEY, id, refreshToken)
    return sessionId
}
async function authenticateUser(user) 
{
    const url = await getServiceURL(AUTHENTICATION_SERVICE)
    if(!url){throw new Error('ER_SERVICE_UNAVAILABLE')}

    try
    {
        return await axios.post(url + 'authenticate', 
        {
            email: user.email,
            password: user.password
        })   
    }
    catch(error)
    {
        if(error.response){return error.response}
        else{throw new Error('Internal Server Error')}   
    }
}
async function getOTP(email) 
{
    const url = await getServiceURL(AUTHENTICATION_SERVICE)
    if(!url){throw new Error('ER_SERVICE_UNAVAILABLE')}

    try
    {
        return await axios.post(url + 'forgot-password', {email})   
    }
    catch(error)
    {
        if(error.response){return error.response}
        else{throw new Error('Internal Server Error')}   
    }
}


module.exports.login = async (req,res) => 
{   
    const loginSchema = Joi.object
    ({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error, value: user } = loginSchema.validate(req.body)
    if (error) {return res.status(400).json({ error: error.name, message: error.message })} 

    try{
        const response = await authenticateUser(user)

        if ( response.status === 200 && response.data.userData ) 
        {
            let user = response.data.userData;
            const sessionId = await createSession(user._id)
            const accessToken = createAccessToken(user, sessionId)
            user.accessToken = accessToken
            return res.status(200).json({message: 'Login Successful', user})  
        } 
        else {return res.status(response.status).json({ error: response.data.error, message: response.data.message })}
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to authenticate user'})
    }
}
module.exports.refresh = async (req, res) => 
{
    try{
        const {accessToken} = req.body
        if(!accessToken) {return res.status(400).json({error: 'ER_MSG_ARG', message: "Required : Access Token"})}

        const decodedToken = jwt.decode(accessToken)
        const id = decodedToken.id
        const role = decodedToken.role
        const sessionId = decodedToken.sessionId

        let refreshToken = await client.hGet(SESSION_HASH_KEY, id) 

        if(!refreshToken){return res.status(401).json({error: 'ER_AUTH', message: "Unauthenticated : You must log in."})}

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decodedToken) => 
        {
            if(err)
            {
                await client.hDel(SESSION_HASH_KEY, id)
                return res.status(403).json({error: 'ER_EXP_SESS', message: "Session Expired : You must log in again."})
            }
            else
            {
                const user = { _id: id, role: role}
                const refreshedToken = createAccessToken(user, sessionId)
                return res.status(200).json({message: 'Token Refreshed', accessToken: refreshedToken})  
            }
        })
    }    
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to refresh token'})
    }
}
module.exports.forgotPassword = async (req,res) => 
{
    const email = req.body.email
    if(!email){return res.status(400).json({ error: 'ER_MSG_ARG', message: 'Required: email' })} 

    try{
        const response = await getOTP(email)

        if ( response.status === 200 && response.data.otp ) 
            {
                let otp = response.data.otp
                await client.setEx(email, 180, otp)
                return res.status(200).json({message: 'OTP Sent'})  
            } 
            else {return res.status(response.status).json({ error: response.data.error, message: response.data.message })}
    }
    catch(err)
    {
        res.status(500).json({  error: 'ER_INT_SERV', message: 'Failed to generate OTP' })
    }
}
module.exports.verifyOTP = async (req,res) => 
    {
        const OTPSchema = Joi.object
        ({
            email: Joi.string().email().required(),
            otp: Joi.number().required()
        })

        const { error, value } = OTPSchema.validate(req.body)
        if (error) {return res.status(400).json({ error: error.name, message: error.message })} 
    
        try{
            const systemOTP = await client.get(value.email)
            const userOTP = value.otp
    
            if ( systemOTP == userOTP ) 
            {
                await client.del(value.email)
                return res.status(200).json({message: 'Verification complete', verified: true})
            } 
            else {return res.status(400).json({ error: 'ER_VERF', message: 'Invalid OTP' })}
        }
        catch(err)
        {
            res.status(500).json({  error: 'ER_INT_SERV', message: 'Failed to verify OTP' })
        }
    }
module.exports.logout = async (req,res) => 
{
    const id = req.body.decodedToken.id

    try{
        await client.hDel(SESSION_HASH_KEY, id)
        return res.status(200).json({message: 'Logout Successful'})  
    }
    catch(err)
    {
        res.status(500).json({  error: 'ER_INT_SERV', message: 'Failed to end session' })
    }
}