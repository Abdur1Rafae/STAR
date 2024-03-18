const express = require('express')
const morgan = require("morgan")
const path = require('path')
const axios = require('axios')
const userRoutes = require('./routes/userRoutes')
const classRoutes = require('./routes/classRoutes')
const assessmentRoutes = require('./routes/assessmentRoutes')
require('dotenv').config()

const app = express()
const PORT = 3001
const HOST = 'localhost'

app.use(express.json())
app.use(morgan('combined'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/user', userRoutes)
app.use('/class', classRoutes)
app.use('/assessment', assessmentRoutes)

app.listen(PORT, () => 
{
  axios({
      method: 'POST',
      url: 'http://localhost:3000/admin/register',
      headers: {'Content-Type': 'application/json'},
      data: 
      {
          serviceName: "edumanage",
          protocol: "http",
          host: HOST,
          port: PORT,
          enabled : true
      }
  }).then((response) => 
  {
    console.log(response.data)
    console.log(`EduManage Microservice avilable at port ${PORT}`)
  }).catch((error) => 
  {
    console.error('Error registering service:', error.code)
  })
})
    


