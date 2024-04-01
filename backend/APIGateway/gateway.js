const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const serviceRoutes = require('./routes/serviceRoutes')
const adminRoutes = require('./routes/adminRoutes')
const auth = require('./middleware/authMiddleware')
require('dotenv').config()
const cors = require('cors')

const app = express()
let corsAllow = {
    origin: "http://localhost:3003",
    methods: "PUT, GET, POST, PATCH, DELETE, HEAD",
    credentials: true
}
app.use(cors(corsAllow))
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

