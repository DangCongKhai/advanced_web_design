const mysql = require('mysql2');
require('dotenv').config();

// Define and create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise()
db.query('SELECT 1').then(() => {
  console.log('MySQL pool is ready')
}).catch((err) => {
  console.error('MySQL pool failed', err)
})

// Export the pool wrapper to use promises (async/await) across your app
module.exports = db
