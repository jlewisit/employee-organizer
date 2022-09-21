const mysql = require('mysql');

// Access .env variables
require('dotenv').config();

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3301,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_Name,
});

connection.connect((err) => {
    if(err) throw err;
});

module.exports = connection;