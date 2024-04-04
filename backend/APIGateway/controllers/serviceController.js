const axios = require('axios')
const getInstanceUrl = require('../util/microservice')

module.exports.redirect = async (req,res) => 
{
    const path = req.params[1]
    const url = await getInstanceUrl(req.params[0])
    if(url)
    {
        axios({
            method: req.method,
            responseType: 'arraybuffer',
            url: url + path,
            headers: { "Content-Type": req.headers['content-type'] }, 
            data: req.body
        }).then((response) => {
            res.set('Content-Type', response.headers['content-type'])
            res.send(response.data)
        }).catch((error) => {
            res.set('Content-Type', 'application/json')
            if (error.response) {res.status(error.response.status || 500).send(error.response.data)} 
            else {res.status(500).json({error: 'ER_INT_SERV', message: 'Failed to complete request'})}              
        })        
    }
    else 
    {
        res.status(404).json({error: "ER_NOT_FOUND", message: "Service Not Found"});
    }
}