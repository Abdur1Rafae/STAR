const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const serviceRoutes = require('./routes/serviceRoutes')
const adminRoutes = require('./routes/adminRoutes')
const auth = require('./middleware/authMiddleware')
require('dotenv').config()

const app = express()
const PORT = 3000

app.use(express.json())
app.use(morgan('combined'))
app.use(helmet())
app.use('/admin', adminRoutes)
app.use(auth)
app.use(serviceRoutes)

app.listen(PORT, () => 
{
    console.log('API Gateway established at port ' + PORT)
})
