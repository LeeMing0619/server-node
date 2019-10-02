const sql = require('mssql');

const db =
{
    "user": "sa",
    "password": "hermes19950603!",
    "server": "211.252.85.144", //192.168.2.4
    "database": "TOPCLASS"
};

const poolPromise = new sql.ConnectionPool(db)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    sql, poolPromise
}