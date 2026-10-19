const mysql = require('mysql2');
require('dotenv').config();

// Create the connection to the database using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'campus_crud'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + db.threadId);
});

module.exports = db;