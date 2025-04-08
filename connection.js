const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "databasesimplewebapp_testing"
})
module.exports = db; // Export the database connection for use in other files
