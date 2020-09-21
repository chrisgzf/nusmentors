const MODES = { DEBUG: 0, PROD: 1 };
const mode = MODES.PROD; //MODES.DEBUG;

const express = require("express");

require("dotenv").config();

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests

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

if (mode == MODES.PROD) {
  // Routes
  const router = require("./routes/routes");
  app.use("/", router);
} else if (mode == MODES.DEBUG) {
  // Test db queries
  const main = require("./testRoutes/main");

  // Test Routes
  app.get("/", (req, res) => res.json({ success: "true" }));
  app.get("/test", (req, res) => main.getData(req, res));
  app.post("/", (req, res) => res.send("POST request received"));
}

// App Server Connection
app.listen(process.env.PORT || 8080, () => {
  console.log(`app is running on port ${process.env.PORT || 8080}`);
});
