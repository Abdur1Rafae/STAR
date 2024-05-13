require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const path = require('path')

const uploadRoutes = require('./routes/uploadRoute')
const questionBankRoutes = require('./routes/questionBankRoutes')
const classManagementRoutes = require('./routes/classManagementRoutes')
const assessmentManagementRoutes = require('./routes/assessmentManagementRoutes')
const gradingRoutes = require('./routes/gradingRoutes')

const app = express()
const PORT = 3002

app.use(express.json())
app.use(morgan('combined'))

app.use('/upload-image', uploadRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/question-bank', questionBankRoutes)
app.use('/class-management', classManagementRoutes)
app.use('/assessment-management', assessmentManagementRoutes)
app.use('/grade', gradingRoutes)

app.listen(PORT, () => 
  {
      console.log('Teacherhub established at port ' + PORT)
  })
    


