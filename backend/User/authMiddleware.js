const jwt = require('jsonwebtoken')
const Query = require('./db_manager/userQuery')
const {executeQuery} = require('./controllers/userController')

const requireAuth = async (req, res, next) => 
{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //check JWT exists and is verified
    if(token)
    {
        try
        {
            const decodedToken = jwt.decode(token)
            const sessionID = decodedToken.sessionID

            const result = await executeQuery(Query.FETCH_UUID, [sessionID])
            if(result.length > 0)
            {
                jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => 
                {
                    if(err){return res.status(403).json({error: true, message: "Token Expired : Refresh token or login again"})}
                    else{next()}
                })
            } 
            else{return res.status(401).json({error: true, message: "Session Expired: You must log in again to access this resource"})}  
        }
        catch(error)
        {
            res.status(500).json({  error: true, message: 'Internal server error: Failed to authenticate' })
        }
    }
    else{return res.status(401).json({error: true, message: "Unauthenticated: You must log in to access this resource"})}
}

module.exports = {requireAuth}