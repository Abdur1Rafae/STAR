const loadbalancer = require('./loadbalancer')
const client = require('../dbconfig/dbcon')

async function getInstanceUrl(serviceName)
{
    const instancesData = await client.lRange(serviceName, 0, -1)
    const instances = instancesData.map(instanceData => JSON.parse(instanceData))
    if(instances.length > 0)
    {
        const newIndex = await loadbalancer.ROUND_ROBIN
        (serviceName, instances) 
        const url = instances[newIndex].url
        return url
    }

    return null
}

module.exports = getInstanceUrl