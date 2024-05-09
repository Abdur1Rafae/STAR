const fs = require('fs')

function remove(imagePath)
{
    if(imagePath)
    {   
        fs.unlinkSync(imagePath, (err) => {if (err) {throw new Error('Failed to update upload')}})
    }   
}

module.exports = remove