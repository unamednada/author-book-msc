const mysql = require('mysql2/promise');

const {
  MYSQL_HOST,
  MYSQL_DB_NAME,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

const connection = mysql.createPool({
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  host: MYSQL_HOST,
  database: MYSQL_DB_NAME,
});

module.exports = connection;
