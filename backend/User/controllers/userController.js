const saltRounds = 10
const tokenExpiration = '2m'
const refreshExpiration = '5m'
require('dotenv').config()
const bcrypt = require('bcrypt')
const Query = require('../db_manager/userQuery')
const pool = require('../db_manager/dbconn')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

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

function validateFields(requiredFields, data)
{
    const missingFields = requiredFields.filter(field => !(field in data));
    if (missingFields.length > 0) 
    {
        return `Missing fields: ${missingFields.join(', ')}` 
    } 
    else  {return null}
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
    const requiredFields = ['email', 'password', 'role']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: response })}    

    const {email, password, role} = req.body

    try{
        //retrieve user information
        const result = await executeQuery(Query.FETCH_USER, [email,role])

        //compare password if user exists
        if(result.length != 0 && await bcrypt.compare(password, result[0].Password))
        {
            const token = createToken(email, role)
            return res.status(200).json({error: false, message: 'Login Successful', accessToken: token})  
        }
        else
        {
            return res.status(401).json({error: true, message: 'Invalid Email or Password'})
        }
    }
    catch(err)
    {
        res.status(500).json({  error: true, message: 'Internal server error: Failed to authenticate user' })
    }
}
module.exports.signup = async (req,res) => 
{
    //validate if all required fields are provided
    const requiredFields = ['email', 'password', 'role']
    const response = validateFields(requiredFields, req.body)
    if(response != null){return res.status(400).json({ error: response })}   
    
    var { first_name, last_name, erp, email, password, role } = req.body

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
        if (!erp) {return res.status(400).json({ error: 'ERP field is required for Student' })}
        query = Query.INSERT_STUDENT
        queryParams = [first_name, last_name, email, password, erp]
    }
    else{return res.status(400).json({ error: 'Role: ' + role + "doesn't exist"})}

    //execute query
    try{
        const result = await executeQuery(query, queryParams)
        res.status(201).json({message: 'User inserted successfully'})
    }
    catch(err){
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Duplicate entry: The user already exists' })
          } else {
            res.status(500).json({ error: 'Internal server error: Failed to insert user' })
          }
    }
}
module.exports.logout = (req,res) => 
{
    res.send('user logout')
}
module.exports.updateProfile = (req,res) => 
{
    res.send('user logout')
}
module.exports.forgotPassword = async (req,res) => 
{
    const {email} = req.body
    if(!email){return res.status(400).json({ error: response })}    
    
    try
    {
        //check if user exists
        const result = await executeQuery(Query.FETCH_USER, [email,role])

        //User not registered
        if(result.length == 0)
        {
            return res.status(400).json({error: 'No such user exists'})
        }
        else
        {

        }
    }
    catch(err)
    {
        res.status(500).json({  error: 'Internal server error: Failed to verify user' })
    }
}
module.exports.resetPassword = (req,res) => 
{
    res.send('user logout')
}
module.exports.verifyEmail = async (req,res) => 
{
}
module.exports.deleteAccount = (req,res) => 
{
    res.send('user logout')
}
