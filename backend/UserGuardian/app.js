const express = require('express')
const morgan = require("morgan")
const axios = require('axios')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()

const app = express()
const PORT = 3001
const HOST = 'localhost'

app.use(express.json())
app.use(morgan('combined'))

app.use(userRoutes)

app.listen(PORT, () => 
{
  axios({
      method: 'POST',
      url: 'http://localhost:3000/registry/register',
      headers: {'Content-Type': 'application/json'},
      data: 
      {
          serviceName: "userguardian",
          protocol: "http",
          host: HOST,
          port: PORT,
          enabled : true
      }
  }).then((response) => 
  {
    console.log(response.data.message)
    console.log(`UserGuardian Microservice avilable at port ${PORT}`)
  }).catch((error) => 
  {
    console.error('Error registering service:', error.code + ":" + error.message)
  })
})
    


