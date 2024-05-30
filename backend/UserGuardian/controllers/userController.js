const conn = require('../dbconfig/dbcon')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const {User} = require('library/index')
const saltRounds = 10
const {sendMail} = require('../mail/mail')

const BASE_USER_SCHEMA = Joi.object
({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const TEACHER_SCHEMA = BASE_USER_SCHEMA.concat(Joi.object({role: Joi.string().valid('teacher').required()}))

const STUDENT_SCHEMA = BASE_USER_SCHEMA.concat(Joi.object({erp: Joi.number().required(), role: Joi.string().valid('student').required()}))

const SIGNUP_SCHEMA = Joi.alternatives().try(TEACHER_SCHEMA, STUDENT_SCHEMA)

function generateOTP() 
{
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp.toString()
}

module.exports.authenticate = async (req,res) => 
{   
    try{
        const userInfo = req.body
        const user = await User.findOne({ email : userInfo.email })

        if(!user){return res.status(404).json({error: 'ER_NOT_FOUND', message: 'User Not Found'})}

        if(await bcrypt.compare(userInfo.password, user.password))
        {
            const userData = 
            {
                _id: user._id,
                name: user.name,
                role: user.role
            }

            if(user.role === 'student'){userData.erp = user.erp}

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
    try
    {
        const { error, value: userInfo } = SIGNUP_SCHEMA.validate(req.body)
        if (error) {return res.status(400).json({ error: error.name, message: error.message })}

        const password = await bcrypt.hash(userInfo.password, saltRounds)

        const existingUser = await User.findOne({ email: userInfo.email })
        if (existingUser && existingUser.password !=null) {return res.status(400).json({ error: 'ER_DUP' , message: 'User already exists' })}
        else if(existingUser && userInfo.role === 'student'){await User.findByIdAndUpdate(existingUser._id, { password })}
        else
        {
            userInfo.password = password
            const user = new User(userInfo)
            await user.save()
        }

        return res.status(201).json({message: 'User registration successful.'})
    }
    catch(err)
    {
        console.log(err)
        if (err.name === 'ValidationError') {return res.status(400).json({ error: err.name, message: err.message })} 
        else{return res.status(500).json({ error: 'ER_INT_SERV', message: 'Failed to register user'})}
    }
}

module.exports.updateProfile = async (req,res) => 
{
    const id = req.body.decodedToken.id

    const {newPassword, currentPassword} =  req.body

    try
    {
        const user = await User.findById(id)
        if(!user){return res.status(404).json({error: 'ER_NOT_FOUND', message: `User not found`}) }
        if(await bcrypt.compare(currentPassword, user.password))
        {
            user.password = await bcrypt.hash(newPassword, saltRounds)
            user.save()
            return res.status(200).json({message: 'Profile updated successfully'})  
        }
        else{return res.status(401).json({error: 'ER_UNAUTH', message: 'Invalid Password: Cannot perform update.'})}
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
        const existingUser = await User.findOne({ email })
        if (!existingUser || (existingUser.role === 'student' && existingUser.password == null)) {return res.status(404).json({ error: 'ER_NOT_FOUND' , message: 'User not found' })}

        const otp  = generateOTP()
        sendMail([email], 'forgotPassword', {otp, username: existingUser.name})
        return res.status(200).json({message: 'OTP Sent', otp})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({  error: 'ER_INT_SERV', message: 'Failed to verify user' })}
}
module.exports.resetPassword = async (req,res) => 
{
    const resetPasswordSchema = Joi.object
    ({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error, value } = resetPasswordSchema.validate(req.body)
    if (error) {return res.status(400).json({ error: error.name, message: error.message })} 
    
    try{
        console.log(value)
        const password = await bcrypt.hash(value.password, saltRounds)
        const updatedUser = await User.findOneAndUpdate({ email: value.email },{password})

        if (!updatedUser) {return res.status(404).json({ error: 'ER_NOT_FOUND' , message: 'User not found' })}
        return res.status(200).json({message: 'Password updated successfully'})
    }
    catch(err){res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to update password'})}
}
module.exports.deleteAccount = async (req,res) => 
{
    const id = req.body.decodedToken.id
    const role = req.body.decodedToken.role

    try{
        const user = await User.findById(id);
        if(!user){return res.status(404).json({error: 'ER_NOT_FOUND', message: 'User Not Found'})}

        if (role === 'teacher') {await User.findByIdAndDelete(id)} 
        else if (role === 'student') 
        {
            if (!user.enrolledSections || user.enrolledSections.length === 0){await User.findByIdAndDelete(id)} 
            else {await User.findByIdAndUpdate(id, { password: null })}
        }
        return res.status(200).json({message: 'User deleted successfully'})  
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'ER_INT_SERV', message: 'Internal server error: Failed to delete user'})}
}
