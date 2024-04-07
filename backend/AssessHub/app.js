require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const axios = require('axios')
const assessmentRoutes = require('./routes/assessmentRoutes')

const app = express()
const PORT = 3003
const HOST = 'localhost'

app.use(express.json())
app.use(morgan('combined'))
app.use('/assessment', assessmentRoutes)


app.listen(PORT, () => 
{
  axios({
      method: 'POST',
      url: 'http://localhost:3000/admin/register',
      headers: {'Content-Type': 'application/json'},
      data: 
      {
          serviceName: "assesshub",
          protocol: "http",
          host: HOST,
          port: PORT,
          enabled : true
      }
  }).then((response) => 
  {
    console.log(response.data)
    console.log(`AssessHub Microservice avilable at port ${PORT}`)
  }).catch((error) => 
  {
    console.error('Error registering service:', error.code)
  })
})
    


