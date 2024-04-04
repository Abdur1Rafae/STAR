const fs = require('fs')
const uploadDir = 'uploads/'

function upload(image)
{
    if(!image){return null}

    const matches = image.match(/^data:image\/([a-zA-Z0-9]+)base64,(.+)$/)

    if (!matches || matches.length !== 3) {throw new Error('Invalid image data')}
    
    const imageType = matches[1]
    const imageData = matches[2]

    const supportedFormats = ['png', 'jpeg', 'gif']
    if (!supportedFormats.includes(imageType)) { throw new Error ('Unsupported image format')}
    
    const buffer = Buffer.from(imageData, 'base64')
    const imageSizeInBytes = Buffer.byteLength(buffer)
    const maxSizeInBytes = 4 * 1024 * 1024 // 4MB limit
    
    if (imageSizeInBytes > maxSizeInBytes) {
        throw new Error('Image size exceeds 4MB limit' )
    }

    const fileName = `image_${Date.now()}.${imageType}`
    const filePath = uploadDir + fileName
    
    // Write the buffer to the file
    fs.writeFile(filePath, buffer, (err) => 
    {
        if (err) {throw new Error('Failed to save image')}  
    })
    return filePath
}

function remove(imagePath)
{
    if(!imagePath){return}
    fs.unlinkSync(imagePath, (err) => {
        if (err) {throw new Error ('Error deleting Cover Image')}
    })
}

function getAssessmentStatus(assessment) 
{
    const currentDate = new Date()
    const openDate = new Date(assessment.openDate)
    const closeDate = new Date(assessment.closeDate)

    // If the current date is before the open date, the assessment is not started
    if (currentDate < openDate) {
        return "Not Started"
    }

    // If the current date is between the open and close dates, the assessment is in progress
    if (currentDate < closeDate && openDate < currentDate) {
        return "In Progress"
    }

    // If the current date is after the close date, check if grades are released
    return "Requires Review"
}


module.exports = {upload, remove, getAssessmentStatus}