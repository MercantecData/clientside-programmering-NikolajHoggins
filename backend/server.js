const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database.js").con;
require("dotenv").config();

//We put "/" at the top, to allow access without authorization key
app.get("/", (req, res) => {
  res.send("This is the backend for weather app!");
});

// parse application/json
app.use(bodyParser.json());

//Middleware to check api key
app.use(function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  if (req.headers.authorization !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid credentials" });
  }
  next();
});

//Get all requests
app.get("/requests", (req, res) => {
  db.query(
    "SELECT city, count(city) as count from weather_requests GROUP BY city",
    (err, result) => {
      if (result) {
        res.send(result);
      } else if (err) {
        res.status(500).json({ error: err });
      }
    }
  );
});

//add request
app.post("/addRequest", (req, res) => {
  db.query(
    `INSERT INTO weather_requests(city, ip) VALUES ('${req.body.city}' , '${req.connection.remoteAddress}')`,
    (err) => {
      console.log(err);
    }
  );
  res.sendStatus(200);
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
