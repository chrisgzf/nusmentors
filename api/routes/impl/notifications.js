const pool = require("../../db");

const getnotifications = (req, res) => {
  const req_uid = req.body.req_uid;
  pool.query(
  `SELECT U.name, N.to_id , N.notif_type, N.date_created 
  FROM Notifies N, UsersInfo U
  WHERE N.from_id = U.user_id
  AND N.to_id = $1`,
  [req_uid],
    (q_err, q_res) => {
      if (q_err) {
        res.status(500).send(q_err);
      } else {
        res.json(q_res.rows);
      }
    },
  );
};


module.exports = {getnotifications}