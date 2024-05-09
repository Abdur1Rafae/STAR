require('dotenv').config()
require('./dbconfig/dbcon')
require('./scheduler')
const express = require('express')
const morgan = require("morgan")
const teacherRoutes = require('./routes/teacherRoutes')
const studentRoutes = require('./routes/studentRoutes')


const app = express()
const PORT = 3004

app.use(express.json())
app.use(morgan('combined'))

app.use('/teacher', teacherRoutes)
app.use('/student', studentRoutes)

app.listen(PORT, () => 
  {
      console.log('Reporthub established at port ' + PORT)
  })
    


