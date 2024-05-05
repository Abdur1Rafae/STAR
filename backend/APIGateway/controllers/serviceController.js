const axios = require('axios')
const getInstanceUrl = require('../util/microservice')

module.exports.redirect = async (req,res) => 
{
    const path = req.params[1]
    const url = await getInstanceUrl(req.params[0])
    if(url)
    {
        const targetURL = url + path + '?' + new URLSearchParams(req.query)
        const isFileUpload = req.method === 'POST' && req.headers['content-type']?.startsWith('multipart/form-data')
        if (isFileUpload) {data = req} 
        else {data = req.body}
        axios
        ({
            method: req.method,
            responseType: 'stream',
            url: targetURL,
            headers: 
            { 
                "Content-Type": req.headers['content-type'], 
            }, 
            data
        })
        .then((response) => {
            res.set(response.headers)
            response.data.pipe(res)
        })
        .catch((error) => {
            res.set('Content-Type', 'application/json')
            if (error.response) 
            {
                res.status(error.response.status || 500);
                error.response.data.pipe(res);
            }
            else {res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to complete request'})}              
        }) 

    }
    else 
    {
        res.status(404).json({error: "ER_NOT_FOUND", message: "Service Not Found"});
    }
}
