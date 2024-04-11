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
      url: 'http://localhost:3000/registry/register',
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
    console.log(response.data.message)
    console.log(`AssessHub Microservice avilable at port ${PORT}`)
  }).catch((error) => 
  {
    if(error.response.status == 409){console.log(`Configurations already exist for Host: ${HOST} at Port: ${PORT}`)}
    else{console.error('Error registering service:', error.code)}
  })
})
    


