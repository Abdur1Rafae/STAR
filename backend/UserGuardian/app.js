require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const axios = require('axios')
const userRoutes = require('./routes/userRoutes')


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
      url: 'http://arete-backend-gateway:3000/registry/register',
      headers: {'Content-Type': 'application/json'},
      data: 
      {
          serviceName: "userguardian",
          protocol: "http",
          host: HOST,
          port: PORT,
          enabled : true,
          url: `http://arete-backend-userguardian:${PORT}/`
      }
  }).then((response) => 
  {
    console.log(response.data.message)
    console.log(`UserGuardian Microservice avilable at port ${PORT}`)
  }).catch((error) => 
  {
    if(error.response.status == 409){console.log(`Configurations already exist for Host: ${HOST} at Port: ${PORT}`)}
    else{console.error('Error registering service:', error.code + ":" + error.message)}
  })
})
    


