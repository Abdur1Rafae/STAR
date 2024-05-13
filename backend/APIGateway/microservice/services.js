const fs = require('fs')

function readServicesFile() 
{
    try 
    {
        const data = fs.readFileSync('./microservice/services.json', 'utf8')
        return JSON.parse(data)
    } 
    catch (err) {return {}}
}

function getServiceURL(serviceName) 
{
    const services = readServicesFile();
    const service = services[serviceName];
    if (service) {
        return service;
    } else {
        return null;
    }
}


module.exports = getServiceURL