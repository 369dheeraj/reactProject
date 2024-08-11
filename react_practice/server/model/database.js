const sql = require('mssql');
require('dotenv').config()

// Database configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_HOST, // You can use 'localhost\\instance' to connect to named instance
    database: 'food',
    options: {
      encrypt: true, // Encrypt data
      trustServerCertificate: true, // Trust self-signed certificate
    }
  };

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Error connecting to SQL Server', err);
    process.exit(1);
  });

module.exports = poolPromise;