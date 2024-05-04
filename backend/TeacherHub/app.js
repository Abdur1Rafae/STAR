require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const axios = require('axios')
const path = require('path')
const questionBankRoutes = require('./routes/questionBankRoutes')
const classManagementRoutes = require('./routes/classManagementRoutes')
const assessmentManagementRoutes = require('./routes/assessmentManagementRoutes')
const gradingRoutes = require('./routes/gradingRoutes')

const app = express()
const PORT = 3002
const HOST = 'localhost'

app.use(express.json())
app.use(morgan('combined'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/question-bank', questionBankRoutes)
app.use('/class-management', classManagementRoutes)
app.use('/assessment-management', assessmentManagementRoutes)
app.use('/grade', gradingRoutes)


app.listen(PORT, () => 
{
  axios({
      method: 'POST',
      url: 'http://localhost:3000/registry/register',
      headers: {'Content-Type': 'application/json'},
      data: 
      {
          serviceName: "teacherhub",
          protocol: "http",
          host: HOST,
          port: PORT,
          enabled : true
      }
  }).then((response) => 
  {
    console.log(response.data.message)
    console.log(`TeacherHub Microservice avilable at port ${PORT}`)
  }).catch((error) => 
  {
    if(error.response.status == 409){console.log(`Configurations already exist for Host: ${HOST} at Port: ${PORT}`)}
    else{console.error('Error registering service:', error.code)}
  })
})
    


