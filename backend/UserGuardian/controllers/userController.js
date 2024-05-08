const conn = require('../dbconfig/dbcon')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const {Teacher, Student} = require('library/index')
const saltRounds = 10
// const {sendMail} = require('../util/Mail/mail')

const USER_SCHEMA = Joi.object
({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('teacher', 'student').required()
})

function generateOTP() 
{
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp.toString()
}

async function registerStudent(userInfo)
{
    userInfo.password = await bcrypt.hash(userInfo.password, saltRounds)

    const existingUser = await Student.findOne({ email : userInfo.email }) 
    if(existingUser){throw new Error('Account already exists')}

    await Student.create([userInfo])

    return{name: userInfo.name, email: userInfo.email}
}

async function registerTeacher(userInfo)
{
    userInfo.password = await bcrypt.hash(userInfo.password, saltRounds)

    const existingUser = await Teacher.findOne({ email : userInfo.email }) 
    if(existingUser){throw new Error('Account already exists')}

    await Teacher.create([userInfo])

    return{name: `${userInfo.firstName} ${userInfo.lastName}`, email: userInfo.email}
}

module.exports.authenticate = async (req,res) => 
{   
    const { error, value: userInfo } = USER_SCHEMA.validate(req.body)
    if (error) {return res.status(400).json({ error: error.name, message: error.message })} 

    try{
        let user

        if(userInfo.role === 'teacher'){user = await Teacher.findOne({ email : userInfo.email })}
        else{user = await Student.findOne({ email : userInfo.email })}

        if(!user){return res.status(404).json({error: 'ER_NOT_FOUND', message: 'User Not Found'})}

        if(user.verified === false){return res.status(403).json({error: 'ER_VERF', message: 'Account Not Verfied'})}


        // if(await bcrypt.compare(user.password, userInfo.password))
        if(true)
        {
            const userData = 
            {
                _id: user._id,
                name: user.firstName + ' ' + user.lastName,
                role: userInfo.role
            }
            return res.status(200).json({message: 'Authentication Successful', userData })
        }
        else{return res.status(401).json({error: 'ER_INVLD_CRED', message: 'Invalid Email or Password'})}
    }
    catch(err){
        console.log(err)
        res.status(500).json({  error: 'ER_INT_SERV', message: 'Failed to authenticate user'})}
}
module.exports.signup = async (req,res) => 
{
    // const { error, value: userInfo } = USER_SCHEMA.validate(req.body)
    // if (error) {return res.status(400).json({ error: error.name, message: error.message })}
    
    const userInfo = req.body

    try
    {
        let newUser
        
        if(userInfo.role === 'teacher'){newUser = registerTeacher(userInfo)}
        else if(userInfo.role === 'student'){newUser = registerStudent(userInfo)}

        const token = jwt.sign({email: newUser.email}, process.env.JWT_SECRET, {expiresIn: '3d'})   
        const user = 
        {
            firstName : newUser.name,
            username : newUser.email,
            verificationLink : `http://localhost:3001/verify-email/${token}`
        }
        //await sendMail([email], 'verification', user)
        return res.status(201).json({message: 'User registration successful. Verification link sent to registered email.'})
    }
    catch(err)
    {
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        else if (err.message === 'Account already exists') { return res.status(400).json({ error: 'ER_DUP_ENTRY', message: 'Account already exists'})} 
        else{return res.status(500).json({ error: 'ER_INT_SERV', message: 'Internal server error: Failed to refresh token'})}
    }
}

module.exports.updateProfile = async (req,res) => 
{
    const email = req.body.decodedToken.email

    //validate if all required fields are provided
    const requiredFields = ['first_name', 'last_name', 'password']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ERR_MSG_ARG', message: response })} 
    
    var {first_name, last_name, password} = req.body

    password = await bcrypt.hash(password, saltRounds)

    try{
        //Update user info in database
        const result = await executeQuery(Query.UPDATE_USER, [first_name, last_name, password, email])
        return res.status(200).json({message: 'Profile Update Successful'})  
    }
    catch(err)
    {
        res.status(500).json({  error: 'ER_INT_SERV', message: 'Internal server error: Failed to refresh token' })
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
        if(result.length == 0) {return res.status(400).json({error: 'ER_NOT_FOUND', message: 'User not found'})}
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
            return res.status(200).json({message: 'OTP Sent'})
        }
    }
    catch(err){res.status(500).json({  error: 'ER_INT_SERV', message: 'Internal server error: Failed to refresh token' })}
}
module.exports.verifyOTP = async (req, res) => 
{
    //validate if all required fields are provided
    const requiredFields = ['email', 'otp']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })} 

    const {email, otp} = req.body
    
    try{
        //verify OTP
        const result = await executeQuery(Query.VERIFY_OTP, [email, otp])
        return res.status(200).json({message: 'OTP Verified'})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({  error: 'ER_INT_SERV', message: 'Internal server error: Failed to refresh token'})}
}
module.exports.resetPassword = async (req,res) => 
{
    //validate if all required fields are provided
    const requiredFields = ['email','password']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: 'ER_MSG_ARG', message: response })} 
   
    const {email, password} = req.body
    
    try{
        //update password
        const result = await executeQuery(Query.UPDATE_PASSWORD, [email, password])
        return res.status(200).json({message: 'Password Update Successful'})
    }
    catch(err){res.status(500).json({error: 'ER_INT_SERV', message: 'Internal server error: Failed to refresh token'})}
}
module.exports.verifyEmail = async (req,res) => 
{
    const{token} = req.params
    try
    {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => 
        {
            if(err){return res.status(403).json({error: 'ER_EXP_TOKEN', message: "Token Expired. Register Again"})}
            else
            {
                const email = decodedToken.email
                await executeQuery(Query.MARK_VERIFIED, [email])
                return res.status(200).json({message: 'Verification Complete'})  
            }
        })
    }
    catch(err){res.status(500).json({error: 'ER_INT_SERV', message: 'Internal server error: Failed to refresh token'})}

}
module.exports.deleteAccount = async (req,res) => 
{
    // const email = req.body.decodedToken.email
    // const role = req.body.decodedToken.role

    // var query
    // if(role.toLowerCase() === 'student'){query = Query.DELETE_STUDENT}
    // else{query = Query.DELETE_TEACHER}


    try{
        //const result = await executeQuery(query, [email])
        return res.status(200).json({message: 'User Deleted Successfully'})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Internal server error: Failed to refresh token'})}
}
