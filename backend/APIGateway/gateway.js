require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const serviceRoutes = require('./routes/serviceRoutes')
const registryRoutes = require('./routes/registryRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const auth = require('./middleware/authMiddleware')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(morgan('combined'))
app.use(helmet())

app.use('/session', sessionRoutes)
app.use('/registry', registryRoutes)
app.use(auth)
app.use(serviceRoutes)


app.listen(PORT, () => 
{
    console.log('API Gateway established at port ' + PORT)
})
