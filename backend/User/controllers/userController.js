const saltRounds = 10
const tokenExpiration = '2m'
const refreshExpiration = '5m'
require('dotenv').config()
const bcrypt = require('bcrypt')
const Query = require('../db_manager/userQuery')
const pool = require('../db_manager/dbconn')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const crypto = require('crypto')
const {sendMail} = require('../util/Mail/mail')

//executes sql query using the existing connection to MYSQL database
function executeQuery(sql, values) 
{
    return new Promise((resolve, reject) => 
    {
        pool.query(sql, values, (error, results) => 
        {
            if(error){reject(error)}
            else{resolve(results)}  
        })
    })
}

//generates a uuid, creates an access and refresh token
function createToken(email, role)
{
    const sessionID = uuid.v4()
    if(createRefreshToken(email, sessionID))
    {
        return jwt.sign({email, role, sessionID}, process.env.JWT_SECRET, {
            expiresIn: tokenExpiration
        })   
    }
    else{throw new Error('Could Not Initiate Session')}
}

//creates a refresh token using the uuid and stores it in database along with user's email
async function createRefreshToken(email, sessionID)
{
    const token = jwt.sign({uuid}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: refreshExpiration
    })
    try
    {
        const result = await executeQuery(Query.INSERT_TOKEN, [email, token, sessionID])
        return true
    }
    catch(error){return false}
}

//validates whether all the required fields are provided in request body
function validateFields(requiredFields, data)
{
    const missingFields = requiredFields.filter(field => !(field in data));
    if (missingFields.length > 0) 
    {
        return `Missing fields: ${missingFields.join(', ')}` 
    } 
    else  {return null}
}

function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp.toString()
  }

module.exports = {executeQuery}
module.exports.refresh = async (req, res) => 
{
    //validate if all required fields are provided
    const {accessToken} = req.body
    if(!accessToken){return res.status(400).json({ error: true, message: "Access Token Required" })}    

    const decodedToken = jwt.decode(accessToken)
    const email = decodedToken.email
    const role = decodedToken.role
    const sessionID = decodedToken.sessionID 

    try{
        //retrieve refresh token using user email
        const result = await executeQuery(Query.FETCH_TOKEN, [email])
        const refreshToken = result[0].refreshToken

        if(refreshToken)
        {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decodedToken) => 
            {
                if(err){return res.status(403).json({error: true, message: "Session Expired : You must log in again."})}
                else
                {
                    const refreshedToken = jwt.sign({email, role, sessionID}, process.env.JWT_SECRET, {
                        expiresIn: tokenExpiration
                    })   
                    return res.status(200).json({error: false, message: 'Token Refreshed', accessToken: refreshedToken})  

                }
            })
        }
        else{return res.status(401).json({error: true, message: "Unauthenticated : You must log in."})}
    }
    catch(err)
    {
        res.status(500).json({  error: 'Internal server error: Failed to refresh token' })
    }
}
module.exports.login = async (req,res) => 
{   
    //validate if all required fields are provided
    const requiredFields = ['email', 'password']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: true, message: response })}    

    const {email, password} = req.body

    try{
        //retrieve user information
        const result = await executeQuery(Query.FETCH_USER, [email])
        //compare password if user exists
        if(result.length != 0 && await bcrypt.compare(password, result[0].Password))
        {
            //check if account is verified
            if(result[0].Verified == 1)
            {
                const role = result[0].Role
                const token = createToken(email, role)
                return res.status(200).json({error: false, message: 'Login Successful', Role: role, accessToken: token})  
            }
            else{
                return res.status(403).json({error: true, message: 'Account Not Verfied'})  
            }
        }
        else{return res.status(401).json({error: true, message: 'Invalid Email or Password'})}
    }
    catch(err){res.status(500).json({  error: true, message: 'Internal server error: Failed to insert user' })}
}
module.exports.signup = async (req,res) => 
{
    //validate if all required fields are provided
    const requiredFields = ['email', 'password', 'role']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: response })}   
    
    var { first_name, last_name, erp, email, password, role} = req.body

    role = role.toLowerCase()

    //encrypt password
    password = await bcrypt.hash(password, saltRounds)

    var queryParams, query

    if(role === "teacher")
    {
        query = Query.INSERT_TEACHER
        queryParams = [first_name, last_name, email, password]
    }
    else if(role=== 'student')
    {
        //additional check for students
        if (!erp) {return res.status(400).json({ error: true, message: 'ERP field is required for Student' })}
        query = Query.INSERT_STUDENT
        queryParams = [first_name, last_name, email, password, erp]
    }
    else{return res.status(400).json({ error: true, message: 'Role: ' + role + "doesn't exist"})}

    //execute query
    try{
        const result = await executeQuery(query, queryParams)
        const secret = process.env.JWT_SECRET + password
        const token = jwt.sign({email}, secret, {
            expiresIn: '3d'
        })   
        const user = 
        {
            firstName : first_name,
            username : email,
            verificationLink : `http://localhost:3001/verify-email/${email}/${token}`
        }
        const emailDelivery = await sendMail([email], 'verification', user)
        res.status(201).json({error: false, message: 'Verification Link sent to email'})
    }
    catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: true, message: 'Duplicate entry: The user already exists' })
          } else {
            res.status(500).json({ error: true, message: 'Internal server error: Failed to insert user' })
          }
    }
}
module.exports.logout = async (req,res) => 
{
    const email = req.decodedToken.email

    try{
        //delete refresh token associated with user from the database
        const result = await executeQuery(Query.REMOVE_TOKEN, [email])
        return res.status(200).json({error: false, message: 'Logout Successful'})  
    }
    catch(err)
    {
        res.status(500).json({  error: true, message: 'Internal server error: Failed to terminate session' })
    }
}
module.exports.updateProfile = async (req,res) => 
{
    const email = req.decodedToken.email

    //validate if all required fields are provided
    const requiredFields = ['first_name', 'last_name', 'password']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: true, message: response })} 
    
    var {first_name, last_name, password} = req.body

    password = await bcrypt.hash(password, saltRounds)

    try{
        //Update user info in database
        const result = await executeQuery(Query.UPDATE_USER, [first_name, last_name, password, email])
        return res.status(200).json({error: false, message: 'Profile Update Successful'})  
    }
    catch(err)
    {
        res.status(500).json({  error: true, message: 'Internal server error: Failed to update profile' })
    }
}
module.exports.forgotPassword = async (req,res) => 
{
    const {email} = req.body
    
    try
    {
        //check if user exists
        const result = await executeQuery(Query.FETCH_USER, [email])

        //User not registered
        if(result.length == 0) {return res.status(400).json({error: true, message: 'User not found'})}
        else
        {
            const otp  = generateOTP()
            const userInfo = 
            {
                otp: otp,
                username : result[0].FirstName
            }
            const dbResponse = await executeQuery(Query.SAVE_OTP, [email, otp])
            sendMail([email], 'forgotPassword', userInfo)
            return res.status(200).json({error: false, message: 'Password Reset OTP Sent'})
        }
    }
    catch(err){res.status(500).json({  error: true, message: 'Internal server error: Failed to reset password' })}
}
module.exports.verifyOTP = async (req, res) => 
{
    //validate if all required fields are provided
    const requiredFields = ['email', 'otp']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: true, message: response })} 
    
    try{
        //verify OTP
        const result = await executeQuery(Query.VERIFY_OTP, [email, otp])
        return res.status(200).json({error: false, message: 'OTP Verified'})  
    }
    catch(err){res.status(500).json({  error: true, message: 'Internal server error: Failed to verify OTP' })}
}
module.exports.resetPassword = async (req,res) => 
{
    //validate if all required fields are provided
    const requiredFields = ['email','password']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: true, message: response })} 
   
    const {email, password} = req.body
    
    try{
        //update password
        const result = await executeQuery(Query.UPDATE_PASSWORD, [email, password])
        return res.status(200).json({error: false, message: 'Password Update Successful'})
    }
    catch(err){res.status(500).json({error: true, message: 'Internal server error: Failed to update password.'})}
}
module.exports.verifyEmail = async (req,res) => 
{
    const{email, token} = req.params
    try{
        //Fetch user
        const result = await executeQuery(Query.FETCH_USER, [email])
        if(result)
        {
            const secret = process.env.JWT_SECRET + result[0].Password
            jwt.verify(token, secret, async (err, decodedToken) => 
            {
                if(err){return res.status(403).json({error: true, message: "Token Expired. Register Again"})}
                else
                {
                    await executeQuery(Query.MARK_VERIFIED, [email])
                    return res.status(200).json({error: false, message: 'Verification Complete'})  

                }
            })
        } 
        else{res.status(403).json({error: true, message: 'User not found'})}
    }
    catch(err){res.status(500).json({error: true, message: 'Internal server error: Failed to insert user'})}

}
module.exports.deleteAccount = async (req,res) => 
{
    const email = req.decodedToken.email

    try{
        //Delete user
        const result = await executeQuery(Query.DELETE_USER, [email])
        return res.status(200).json({error: false, message: 'User Deleted Successfully'})  
    }
    catch(err){res.status(500).json({error: true, message: 'Internal server error: Failed to delete user'})}
}
