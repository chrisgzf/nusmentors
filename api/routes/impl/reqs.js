const pool = require("../../db");

const getallrequests = (req, res) => {
  pool.query(
    `SELECT * FROM Requests ORDER BY date_created DESC`,
    (q_err, q_res) => {
      if (q_err) {
        res.status(500).send(q_err);
      } else {
        res.json(q_res.rows);
      }
    },
  );
};

const postnewrequest = (req, res) => {
  const {
    req_id,
    mentee_id,
    problem_type,
    title,
    description,
    career_type,
    date_created,
  } = req.body;
  pool.query(
    `INSERT INTO Requests(req_id, mentee_id, problem_type, title, description, career_type, date_created)
    VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [
      req_id,
      mentee_id,
      problem_type,
      title,
      description,
      career_type,
      date_created,
    ],
    (q_err, q_res) => {
      if (q_err) {
        res.status(500).send(q_err);
      } else {
        res.sendStatus(200);
      }
    },
  );
};

// deleterequest only works on requests that have not been accepted
const deleterequest = (req, res) => {
  const req_id = req.params.req_id;
  pool.query(
    `DELETE FROM Requests WHERE req_id = $1`,
    [req_id],
    (q_err, q_res) => {
      if (q_err) {
        res.status(500).send(q_err.message || q_err);
      } else {
        res.sendStatus(200);
      }
    },
  );
};

// allows user to update the information on request
const updaterequest = (req, res) => {
  const req_id = req.params.req_id;
  const { problem_type, title, description, career_type } = req.body;
  pool.query(
    `UPDATE Requests
    SET problem_type=COALESCE($2, problem_type), title=COALESCE($3, title), 
    description=COALESCE($4, description), career_type=COALESCE($5, career_type)
    WHERE req_id=$1
    `,
    [req_id, problem_type, title, description, career_type],
    (q_err, q_res) => {
      if (q_err) {
        res.status(500).send(q_err.message || q_err);
      } else {
        res.sendStatus(200);
      }
    },
  );
};

const acceptrequest = (req, res) => {
  const { req_id, mentor_uid } = req.params;
  pool.query(
    `CALL acceptRequest($1, $2)`,
    [req_id, mentor_uid],
    (q_err, q_res) => {
      if (q_err) {
        res.status(500).send(q_err.message || q_err);
      } else {
        res.sendStatus(200);
      }
    },
  );
};

module.exports = {
  getallrequests,
  postnewrequest,
  deleterequest,
  updaterequest,
  acceptrequest,
};
