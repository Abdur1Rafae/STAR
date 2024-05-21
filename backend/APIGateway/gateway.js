require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const serviceRoutes = require('./routes/serviceRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const auth = require('./middleware/authMiddleware')
require('dotenv').config()
const cors = require('cors')

const app = express()
let corsAllow = {
    origin: "*",
    methods: "PUT, GET, POST, PATCH, DELETE, HEAD",
    credentials: true
}
app.use(cors("*"))
const PORT = 3000

app.use(express.json())
app.use(morgan('combined'))
app.use(helmet())
console.log(new Date())

app.use(auth)
app.use('/session', sessionRoutes)
app.use(serviceRoutes)


app.listen(PORT, () => 
{
    console.log('API Gateway established at port ' + PORT)
})

