const { Pool } = require("pg");

require("dotenv").config();

// db connection with localhost

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nusmentors",
  password: "password",
  port: 5432,
});

module.exports = pool;