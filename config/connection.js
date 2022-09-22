const mysql = require('mysql2');

// Access .env variables
require('dotenv').config();

// Connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_Name,
});

connection.connect((err) => {
    if(err) throw err;
});

module.exports = connection;