const {createPool} = require('mysql2')

const pool = createPool({
  host: "localhost",
  port: "4000",
  user: "root",
  password: "root",
  connectionLimit: 5, 
  database: "Arete",
  multipleStatements: true 
})

//executes sql query using the existing connection to MYSQL database
function executeQuery(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((getConnectionError, connection) => {
            if (getConnectionError) {
                reject(getConnectionError);
                return;
            }

            connection.beginTransaction(transactionError => 
            {
                if (transactionError) {
                    connection.release();
                    reject(transactionError);
                    return;
                }

                connection.query(sql, values, (queryError, results) => {
                    if (queryError) 
                    {
                        connection.rollback(() => {
                            connection.release();
                            reject(queryError);
                        });
                        return;
                    }

                    connection.commit(commitError => {
                        if (commitError) {
                            connection.rollback(() => {
                                connection.release();
                                reject(commitError);
                            });
                            return;
                        }

                        connection.release();
                        resolve(results);
                    });
                });
            });
        });
    });
}

module.exports = executeQuery
