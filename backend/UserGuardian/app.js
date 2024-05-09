require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const userRoutes = require('./routes/userRoutes')


const app = express()
const PORT = 3001

app.use(express.json())
app.use(morgan('combined'))

app.use(userRoutes)

app.listen(PORT, () => 
  {
      console.log('UserGuardian established at port ' + PORT)
  })
    


