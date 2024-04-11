const client = require('../dbconfig/dbcon')
const Joi = require('joi')

const CONFIG_SCHEMA = Joi.object
({
    serviceName: Joi.string().required(),
    protocol: Joi.string().valid('http', 'https').required(),
    host: Joi.string().required(),
    port: Joi.number().integer().min(1).max(65535).required()
})

async function instanceExists(serviceName, url) 
{
    const instancesData = await client.lRange(serviceName, 0, -1)
    const instances = instancesData.map(instanceData => JSON.parse(instanceData))
    const existingInstance = instances.findIndex(inst => inst.url === url);
    return existingInstance
}

module.exports.manage = async (req,res) => 
{
    const schema = CONFIG_SCHEMA.keys({enabled: Joi.boolean().required()})

    const { error, value: config } = schema.validate(req.body)
    if (error) {return res.status(400).json({ error: error.name, message: error.message })} 

    try{

        config.url = config.protocol + "://" + config.host + ":" + config.port + "/" 
        const serviceName = config.serviceName.toLowerCase()
        const index = await instanceExists(serviceName, config.url)

        if (index == -1)
        {
            return res.status(409).json({ message: `Configuration for ${config.serviceName} does not exists at ${config.url}` })
        }
        else
        {
            let existingInstance = await client.lIndex(serviceName, index)
            existingInstance = JSON.parse(existingInstance)
            existingInstance.enabled = config.enabled
            await client.lSet(serviceName, index, JSON.stringify(existingInstance))
            return res.status(201).json({ message: `${config.serviceName} instance updated successfully at ${config.url}`})
        }  
    }
    catch(error){
        return res.status(500).json({ error: 'ER_INT_SERV', message : 'Failed to update microservice'})
    }
}
module.exports.register = async (req,res) => 
{
    const schema = CONFIG_SCHEMA.keys({enabled: Joi.boolean().required()})

    const { error, value: config } = schema.validate(req.body)
    if (error) {return res.status(400).json({ error: error.name, message: error.message })} 

    try{
        config.url = config.protocol + "://" + config.host + ":" + config.port + "/" 
        const serviceName = config.serviceName.toLowerCase()
        const index = await instanceExists(serviceName, config.url)

        if (index >= 0)
        {
            return res.status(409).json({ message: `Configuration for ${config.serviceName} already exists at ${config.url}` })
        }
        else
        {
            const instance = { url: config.url, enabled: config.enabled }
            await client.rPush(config.serviceName, JSON.stringify(instance))
            return res.status(201).json({ message: `${config.serviceName} instance registered successfully at ${config.url}` })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error: 'ER_INT_SERV', message : 'Failed to register microservice'})
    }
}
module.exports.unregister = async (req,res) => 
{
    const { error, value: config } = CONFIG_SCHEMA.validate(req.body)
    if (error) {return res.status(400).json({ error: error.name, message: error.message })} 
    try{
        config.url = config.protocol + "://" + config.host + ":" + config.port + "/" 
        const serviceName = config.serviceName.toLowerCase()
        const index = await instanceExists(serviceName, config.url)

        if (index == -1)
        {
            return res.status(409).json({ message: `Configuration for ${config.serviceName} does not exists at ${config.url}` })
        }
        else
        {
            let existingInstance = await client.lIndex(serviceName, index)
            await client.lRem(serviceName, 1, existingInstance)
            return res.status(201).json({ message: `${config.serviceName} instance unregistered successfully at ${config.url}` })
        }  
    }
    catch(error){
        return res.status(500).json({ error: 'ER_INT_SERV', message : 'Failed to unregister microservice'})
    }  
}
