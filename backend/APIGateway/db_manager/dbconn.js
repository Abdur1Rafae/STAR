const {createPool} = require('mysql2')

const pool = createPool({
  host: "localhost",
  port: "4000",
  user: "root",
  password: "root",
  connectionLimit: 5, 
  database: "Arete"
})

//executes sql query using the existing connection to MYSQL database
function executeQuery(sql, values) 
{
  return new Promise((resolve, reject) => 
  {
      pool.query(sql, values, (error, results) => 
      {
          if(error)
          {
              reject(error)
          }
          else{resolve(results)}  
      })
  })
}

module.exports = executeQuery
