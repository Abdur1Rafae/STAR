const express = require('express')
const router = express.Router()
const axios = require('axios')
const registry = require('./registry.json')
const loadbalancer = require('../util/loadbalancer')
const fs = require('fs')


router.all('/:serviceName/:path', (req,res) => {
    const service = registry.services[req.params.serviceName]
    if (service) 
    {
        const newIndex = loadbalancer.ROUND_ROBIN
        (service) 
        const url =service.instances[newIndex].url
        console.log(url)
        axios({
            method: req.method,
            url: url + req.params.path,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            res.send(response.data);
        }).catch((error) => {
            res.status(500).send("Internal server error");
        });        
    }
    else 
    {
        res.status(404).send("API doesn't exist");
    }

})

router.post('/manage', (req, res) => {
    const index = serviceExists(req.body)
    if(index == -1){res.send("Could not find " + req.body.url + " for service '" + req.body.serviceName + "'")}
    else
    {
        const instances = registry.services[req.body.serviceName].instances
        const status = req.body.enabled === "true" ? "enable" : "disable"
        instances[index].enabled = req.body.enabled
        const failurePrompt = "Could not "  + status + " '" + req.body.serviceName + "' at " + req.body.url
        const successPrompt = "Successsfully " + status + "d '" + req.body.serviceName + "' at " + req.body.url 
        record(successPrompt,failurePrompt,res)
    }
})

router.post('/register', (req, res) => 
{
    const serviceInfo = req.body
    serviceInfo.url = serviceInfo.protocol + "://" + serviceInfo.host + ":" + serviceInfo.port + "/" 
    if(serviceExists(serviceInfo) != -1)
    {
        res.send("Configuration already exists for '" + serviceInfo.serviceName + "' at " + serviceInfo.url)
    }
    else
    {
        if(!registry.services[serviceInfo.serviceName])
        { 
            registry.services[serviceInfo.serviceName] = {index:0, instances:[]}
        }
        registry.services[serviceInfo.serviceName].instances.push({...serviceInfo})
        const failurePrompt = "Could not register '"  + serviceInfo.serviceName + "'"
        const successPrompt = "Successsfully registered '" + serviceInfo.serviceName + "'"
        record(successPrompt,failurePrompt,res)
    }
})

router.post('/unregister', (req, res) => 
{
    const serviceInfo = req.body
    serviceInfo.url = serviceInfo.protocol + "://" + serviceInfo.host + ":" + serviceInfo.port + "/" 
    const index = serviceExists(serviceInfo)
    if(index != -1)
    {
        registry.services[serviceInfo.serviceName].instances.splice(index, 1)
        if(registry.services[serviceInfo.serviceName].instances.length == 0){ delete registry.services[serviceInfo.serviceName]}
        const failurePrompt = "Could not unregister '"  + serviceInfo.serviceName + "'"
        const successPrompt = "Successsfully unregistered '" + serviceInfo.serviceName + "'"
        record(successPrompt,failurePrompt,res)
    }
    else
    {
        res.send("Configuration does not exists for '" + serviceInfo.serviceName + "' at " + serviceInfo.url)
    }

})

const serviceExists = (serviceInfo) => 
{   
    let index = -1
    if (registry.services[serviceInfo.serviceName]) 
    {
        registry.services[serviceInfo.serviceName].instances.forEach((instance,position) => 
        {
            if(instance.url === serviceInfo.url)
            {
                index = position
                return
            } 
        })
    }
    return index
}

const record = (success, failure, res) => 
{
    fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => 
    {
        if(error){res.send(failure)}
        else{res.send(success)}
    })
}

module.exports = router