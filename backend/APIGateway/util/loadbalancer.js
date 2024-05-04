const client = require('../dbconfig/dbcon')

const loadbalancer = {}

loadbalancer.ROUND_ROBIN = async (serviceName, instances) => 
{   
    let serviceIndex = await client.hGet('ROUND_ROBIN_INDEX', serviceName) || 0
    const newIndex = ++serviceIndex >= instances.length ? 0 : serviceIndex
    await client.hSet('ROUND_ROBIN_INDEX', serviceName, newIndex)
    return loadbalancer.isEnabled(serviceName, instances, newIndex)
}

loadbalancer.isEnabled = (serviceName, instances, index) => {
    return instances[index].enabled ? index : this.ROUND_ROBIN(serviceName, instances)
}

module.exports = loadbalancer