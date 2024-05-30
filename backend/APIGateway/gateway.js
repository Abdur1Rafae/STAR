require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const serviceRoutes = require('./routes/serviceRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const auth = require('./middleware/authMiddleware')
const cors = require('cors')


const app = express()
app.use(cors("*"))
const PORT = 3000

app.use(express.json())
app.use(morgan('combined'))
app.use(helmet())

app.use(auth)
app.use('/backend/session', sessionRoutes)
app.use('/backend', serviceRoutes)


app.listen(PORT, () => 
{
    console.log('API Gateway established at port ' + PORT)
})
