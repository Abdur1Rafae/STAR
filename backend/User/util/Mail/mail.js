const nodeMailer = require('nodemailer')
const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
require('dotenv').config()

const transporter = nodeMailer.createTransport(
{
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user : 'maaz5319@gmail.com',
        pass: process.env.APP_PASSWORD
    }

})

// Function to load email template from file
function loadEmailTemplate(templateName, data) 
{
    const templatePath = path.join(__dirname, 'mail-templates', `${templateName}.html`)
    const source = fs.readFileSync(templatePath, 'utf8')
    const template = handlebars.compile(source)
    return template(data)
    
}

const sendMail = async ([recipients], type, replacements) =>
{
    // Load template based on type
    let templateName, subject;
    if (type === 'verification') 
    {
        templateName = 'emailVerification'
        subject = 'Email Verification'
    } 
    else if (type === 'forgotPassword') {
        templateName = 'forgotPassword'
        subject = 'Action Required: Reset Your Password Now'
    } 
    else {throw new Error('Invalid email type')}

    const email = loadEmailTemplate(templateName, replacements)

    const mailOptions = 
    {
        from: 
        {
            name: 'ARETE',
            address: 'maaz5319@gmail.com'
        },
        to : [recipients],
        subject : subject,
        html : email
    }
    await transporter.sendMail(mailOptions, (error, info) => 
    {
        if (error) {console.error('Error occurred:', error)} 
       
        else {console.log('Email sent successfully:', info.response)}
    })     
}

module.exports = {sendMail}