const pool = require("../db");

const getData = (req, res) => {
  pool.query("SELECT * FROM test", (error, results) => {
    if (error) {
      console.log(error);
    }
    res.json(results.rows);
  });
};

module.exports = {
  getData,
};
