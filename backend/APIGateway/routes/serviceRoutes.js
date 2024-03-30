const express = require('express')
const router = express.Router()
const axios = require('axios')
const registry = require('./serviceRegistry.json')
const loadbalancer = require('../util/loadbalancer')

router.all(/^\/([^\/]+)\/(.*)/, (req,res) => 
{
    const service = registry.services[req.params[0]]
    const path = req.params[1]
    if (service) 
    {
        const newIndex = loadbalancer.ROUND_ROBIN
        (service) 
        const url = service.instances[newIndex].url
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
        res.status(404).send("API doesn't exist");
    }

})

module.exports = router


