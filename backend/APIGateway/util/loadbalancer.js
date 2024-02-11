const loadbalancer = {}

loadbalancer.ROUND_ROBIN = (service) => 
{   
    const newIndex = ++service.index >= service.instances.length ? 0 : service.index
    service.index = newIndex
    return loadbalancer.isEnabled(service, newIndex)
}

loadbalancer.isEnabled = (service,index) => {
    return service.instances[index].enabled ? index : this.ROUND_ROBIN(service)
}

module.exports = loadbalancer