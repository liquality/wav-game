var mysql = require("mysql2");
var config = require("./config.json");

const mysqlConfig = !process.env.MYSQLDATABASE
  ? config.database_connection
  : {
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      database: process.env.MYSQLDATABASE,
      password: process.env.MYSQLPASSWORD,
      port: process.env.MYSQLPORT,
    };

console.log(mysqlConfig);

var pool = mysql.createPool(mysqlConfig);

module.exports.pool = pool;
