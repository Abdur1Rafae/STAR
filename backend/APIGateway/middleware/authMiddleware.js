const jwt = require('jsonwebtoken')
const executeQuery = require('../db_manager/dbconn')

//paths that do not require authentication
const unauthenticatedPaths = 
[
'/edumanage/user/login', 
'/edumanage/user/signup', 
'/edumanage/user/forgot-password', 
'/edumanage/user/refresh', 
'/edumanage/user/verify-email', 
'/edumanage/user/verify-otp', 
'/edumanage/user/password-reset' 
]

// Function to verify JWT
const verifyToken = async (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        return decodedToken
    } catch (error) {
        throw new Error('Token verification failed')
    }
}

// Function to check if session is valid
const checkSession = async (sessionID) => {
    const query = 'Select uuid from SessionInfo where uuid = ?'
    const result = await executeQuery(query, [sessionID])
    if (result.length > 0) {
        return true
    } else {
        throw new Error('Session expired')
    }
}

const authentication = async (req, res, next) => 
{
    if (unauthenticatedPaths.includes(req.path)) {return next()}
    if (req.path.startsWith('/edumanage/user/verify-email') || req.path.startsWith('/edumanage/uploads')) {return next()}
    else
    {   
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(!token){return res.status(401).json({error: true, message: "Unauthenticated: You must log in to access this resource"})}
        try
        {
            const decodedToken = await verifyToken(token)
            const sessionID = decodedToken.sessionID
            //await checkSession(sessionID)
            req.body.decodedToken = decodedToken
            return next()
        }
        catch(error)
        {
            if (error.message === 'Session expired') {return res.status(401).json({ error: true, message: 'Session Expired: You must log in again to access this resource' })} 
            else {return res.status(403).json({ error: true, message: 'Token Expired: Refresh token or login again' })}
        }
    }
}

module.exports = authentication