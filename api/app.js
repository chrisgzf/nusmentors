const express = require("express");

require("dotenv").config();

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests

// db connection with localhost
const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nusmentors",
  password: "password",
  port: 5432,
});

// App
const app = express();

// App Middleware
const whitelist = ["http://localhost:3000", "https://nusmentors.vercel.app/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'

// Controllers - aka, the db queries
const main = require('./controllers/main')

// Test Routes
app.get("/", (req, res) => res.json({ success: "true" }));
app.get('/test', (req, res) => main.getData(req, res, db));
app.post("/", (req, res) => res.send("POST request received"));

// App Server Connection
app.listen(process.env.PORT || 8080, () => {
  console.log(`app is running on port ${process.env.PORT || 8080}`);
});
