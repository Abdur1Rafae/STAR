require('dotenv').config()
const conn = require('./dbconfig/dbcon')
require('./scheduler')
const express = require('express')
const morgan = require("morgan")
const axios = require('axios')
const teacherRoutes = require('./routes/teacherRoutes')
const studentRoutes = require('./routes/studentRoutes')


const app = express()
const PORT = 3004
const HOST = 'localhost'

app.use(express.json())
app.use(morgan('combined'))

app.use('/teacher', teacherRoutes)
app.use('/student', studentRoutes)

app.listen(PORT, () => 
{
  axios({
      method: 'POST',
      url: 'http://arete-backend-gateway:3000/registry/register',
      headers: {'Content-Type': 'application/json'},
      data: 
      {
          serviceName: "reporthub",
          protocol: "http",
          host: HOST,
          port: PORT,
          enabled : true,
          url: `http://arete-backend-reporthub:${PORT}`
      }
  }).then((response) => 
  {
    console.log(response.data.message)
    console.log(`UserGuardian Microservice avilable at port ${PORT}`)
  }).catch((error) => 
  {
    if(error.response && error.response.status == 409){console.log(`Configurations already exist for Host: ${HOST} at Port: ${PORT}`)}
    else{console.error('Error registering service:', error.code + ":" + error.message)}
  })
})
    


