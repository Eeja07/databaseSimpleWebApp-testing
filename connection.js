// const mysql = require('mysql')
// const db = mysql.createConnection({
//     host: "127.0.0.1", 
//     user: "root", 
//     password: "", 
//     database: "databasesimplewebapp_testing"
// })
// module.exports = db;

const { Pool } = require('pg');

const db = new Pool({
host: "127.0.0.1",
user: "eeja", // Replace with your PostgreSQL username
password: "", // Replace with your PostgreSQL password
database: "account_informations", // Replace with your PostgreSQL database name
port: 5432 // Default PostgreSQL port
});

module.exports = db;