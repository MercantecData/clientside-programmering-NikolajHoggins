const mysql = require("mysql2");
require("dotenv").config();

const con = mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "user",
  password: process.env.DB_PASSWORD ?? "pass",
  database: process.env.DB_NAME ?? "db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query(
  "CREATE TABLE IF NOT EXISTS weather_requests ( `id` INTEGER PRIMARY KEY AUTO_INCREMENT, `city` varchar(64), `ip` varchar(16))",
  (err) => {
    if (err) console.log("ERROR: \n", err);
  }
);

module.exports.con = con;
