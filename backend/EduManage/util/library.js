//validates whether all the required fields are provided in request body
function validateFields(requiredFields, data)
{
    const missingFields = requiredFields.filter(field => !(field in data));
    if (missingFields.length > 0) 
    {
        return `Missing fields: ${missingFields.join(', ')}` 
    } 
    else  {return null}
}

module.exports = validateFields