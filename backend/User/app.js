const express = require('express')
const cookieParser = require('cookie-parser')
const routes = require('./routes/userRoutes')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(routes)
app.use(cookieParser())

    
// Start the Express server
app.listen(PORT, () => 
{
  console.log(`Server is running on port ${PORT}`)
})


