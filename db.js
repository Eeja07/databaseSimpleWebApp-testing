// const mysql = require('mysql')
// const db = mysql.createConnection({
//     host: "127.0.0.1", 
//     user: "root", 
//     password: "", 
//     database: "databasesimplewebapp_testing"
// })
// module.exports = db;

// const { Pool } = require('pg');

// const db = new Pool({
// host: "127.0.0.1",
// user: "eeja", 
// password: "1", 
// database: "account_informations", 
// port: 5432 
// });

// module.exports = db;
const { Pool } = require('pg');

const db = new Pool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "eeja", 
  password: process.env.DB_PASSWORD || "1", 
  database: process.env.DB_NAME || "testing", 
  port: process.env.DB_PORT || 5432 
});

module.exports = db;