const jwt = require('jsonwebtoken')
const client = require('../dbconfig/dbcon')
const SESSION_HASH_KEY = 'SESSION_ID'

//paths that do not require authentication
const unauthenticatedPaths = 
[
'/userguardian/signup', 
'/userguardian/reset-password',
'/session/login',
'/session/refresh',
'/session/forgot-password',
'/session/verify-otp', 
]

const verifyToken = async (token) => 
{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedToken){ throw new Error('Token verification failed')}
    return decodedToken
}

const checkSession = async (id, sessionId) =>
{
    const refreshToken = await client.hGet(SESSION_HASH_KEY, id)
    if(!refreshToken){ throw new Error('Session Expired')}
    const decodedToken = jwt.decode(refreshToken)
    const redisSess = decodedToken.sessionId
    if(redisSess != sessionId){ throw new Error('Session Expired')}
}

const authentication = async (req, res, next) => 
{
    if (unauthenticatedPaths.includes(req.path)) {return next()}
    else
    {   
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if(!token){return res.status(401).json({error: true, message: "Unauthenticated: You must log in to access this resource"})}
        try
        {
            const decodedToken = await verifyToken(token)
            const id = decodedToken.id
            const sessionId = decodedToken.sessionId
            //await checkSession(id, sessionId)
            req.body.decodedToken = decodedToken
            return next()
        }
        catch(error)
        {
            if (error.message === 'Session Expired') {return res.status(401).json({ error: 'ER_EXP_SESSION', message: 'Session Expired: You must log in again to access this resource' })} 
            else {return res.status(403).json({ error: true, message: 'Token Expired: Refresh token or login again' })}
        }
    }
}

module.exports = authentication