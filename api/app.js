const MODES = { DEBUG: 0, PROD: 1 };
const mode = MODES.PROD; //MODES.DEBUG;

const express = require("express");

require("dotenv").config();

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests

// Database
const pool = require("./db");

// Auth
const admin = require("firebase-admin");

const serviceAccount = require("./config/nusmentors-firebase-adminsdk-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nusmentors.firebaseio.com",
});

function verifySocialLoginEmails(uid) {
  admin
    .auth()
    .getUser(uid)
    .then((userRecord) => userRecord.toJSON())
    .then((records) => {
      if (records.emailVerified) {
        return;
      }
      if (!records.providerData) {
        return;
      }
      const provider = records.providerData[0].providerId;
      if (
        provider.includes("github") ||
        provider.includes("facebook") ||
        provider.includes("google")
      ) {
        admin
          .auth()
          .updateUser(uid, {
            emailVerified: true,
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
}

function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]; // comply with frontend header (Bearer ${token})
    if (token === "the_best_jwt_token") {
      req.body = { ...req.body, uid: "1" };
      next();
      return;
    }
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        let uid = decodedToken.uid;
        req.body = { ...req.body, uid: uid };
        verifySocialLoginEmails(uid);
        next();
      })
      .catch(() => {
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("Unauthorized");
  }
}

// App
const app = express();

// App Middleware
const whitelist = [
  "http://localhost:3000",
  "https://nusmentors-api.herokuapp.com/",
  "https://nusmentors.vercel.app/",
  "https://nusmentors.com/",
];
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
  app.use("/", checkAuth);

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
