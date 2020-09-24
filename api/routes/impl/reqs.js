const pool = require("../../db");

const getallrequests = (req, res) => {
  pool.query(
    `SELECT req_id, problem_type, title, description, career_type, date_created, should_display, name, photo_url, nus_email, matric_date, grad_date, major, telegram
     FROM Requests INNER JOIN UsersInfo ON (UsersInfo.user_id = Requests.mentee_id)
     ORDER BY date_created DESC`,
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
    uid,
    problem_type,
    title,
    description,
    career_type,
    date_created, // if date is undefined, we will use the current date
  } = req.body;

  const mentee_id = uid;

  pool.query(
    `INSERT INTO Requests(mentee_id, problem_type, title, description, career_type, date_created)
    VALUES($1, $2, $3, $4, $5, COALESCE($6, NOW()))`,
    [
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
        res.json(req.body);
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
        res.status(200).send({ message: "OK" });
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
        res.status(200).send({ message: "OK" });
      }
    },
  );
};

// upon accepting a request, the req_id and mentor_uid is added to mentorship table 
// and the request's should_display attribute is set to FALSE.
const acceptrequest = (req, res) => {
  const { req_id } = req.params;
  const mentor_uid = req.body.uid;
  pool.query(
    `CALL acceptRequest($1, $2)`,
    [req_id, mentor_uid],
    (q_err, q_res) => {
      if (q_err) {
        res.status(500).send(q_err.message || q_err);
      } else {
        res.status(200).send({ message: "OK" });
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
