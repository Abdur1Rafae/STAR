const {createPool} = require('mysql2')

const pool = createPool({
  host: "localhost",
  port: "4000",
  user: "root",
  password: "root",
  connectionLimit: 5, 
  database: "Arete"
})

module.exports = pool
