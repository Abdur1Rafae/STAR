require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const assessmentRoutes = require('./routes/assessmentRoutes')
const monitoringRoutes = require('./routes/monitoringRoutes')

const app = express()
const PORT = 3003

app.use(express.json())
app.use(morgan('combined'))
app.use('/assessment', assessmentRoutes)
app.use('/monitor', monitoringRoutes)

app.listen(PORT, () => 
{
      console.log('Assesshub established at port ' + PORT)
})
    


