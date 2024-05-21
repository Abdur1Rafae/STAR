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
        user : process.env.EMAIL_USERNAME,
        pass: process.env.APP_PASSWORD
    }

})

function loadEmailTemplate(templateName, data) 
{
    const templatePath = path.join(__dirname, 'mail-templates', `${templateName}.html`)
    const source = fs.readFileSync(templatePath, 'utf8')
    const template = handlebars.compile(source)
    return template(data)
    
}

const sendMail = ([recipients], type, replacements) =>
{
    let templateName, subject;
    if (type === 'verification') 
    {
        templateName = 'emailVerification'
        subject = 'Action Required: Verify Your Email'
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
            address: process.env.EMAIL_USERNAME
        },
        to : [recipients],
        subject : subject,
        html : email
    }
    transporter.sendMail(mailOptions, (error, info) => 
    {
        if (error) {throw new Error('Failed to send OTP')} 
        else {console.log('Email sent successfully:', info.response)}
    })     
}

module.exports = {sendMail}