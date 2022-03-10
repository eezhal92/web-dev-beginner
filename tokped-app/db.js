/**
 * Membuat koneksi ke database
 */
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // change this
  password: 'password', // change this
  database: 'tokped'
});

module.exports = connection;
