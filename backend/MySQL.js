var mysql = require("mysql2");
var config = require("./config.json");

console.log(
  config.database_connection,
  "<-- local & CONFIG DB CONNECTION env variables:",
  {
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    database: process.env.MYSQLDATABASE,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT,
  }
);
var pool = mysql.createPool(
  !process.env.MYSQLDATABASE
    ? config.database_connection
    : {
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        database: process.env.MYSQLDATABASE,
        password: process.env.MYSQLPASSWORD,
        port: process.env.MYSQLPORT,
      }
);

module.exports.pool = pool;
