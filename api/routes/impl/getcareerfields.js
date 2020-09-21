const pool = require('../../db');

module.exports = (req, res) => {
  pool.query(
    `SELECT DISTINCT C.career_type, count(*) as num_of_mentions
     FROM CareerTypes C, Requests R
     WHERE C.career_type = ANY(R.career_type)
     GROUP BY C.career_type
     ORDER BY num_of_mentions DESC`,
    (q_err, q_res) => {
      if (q_err) {
        res.status(500).send(q_err);
      } else {
        res.json(q_res.rows); // TODO: insert shenanigans to process data into sth prettier
      }
    }
  );
};
