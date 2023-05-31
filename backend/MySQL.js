var mysql = require("mysql2");
var config = require("./config.json");

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
