const pool = require('../../db');

const getcontact = (req, res) => {
    const req_id  = req.params.req_id;
    const req_uid = req.body.uid; //requester_uid

    pool.query(
        `SELECT mentor_uid, mentor_name, mentor_photo, mentor_email, mentor_major, mentor_tg, mentee_uid, mentee_name, mentee_photo, mentee_email, mentee_major, mentee_tg
         FROM MentorContact NATURAL JOIN MenteeContact
         WHERE req_id = $1`,
        [req_id],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else if (q_res.length == 0) {
                res.status(403).send("No permission to view request contacts.");
                // request does not exist
            } else {
                // assert q_res.length == 1
                info = q_res.rows[0];

                if (req_uid == info.mentor_uid) {
                    res.status(200).send({
                        name:       info.mentee_name,
                        photo_url:  info.mentee_photo,
                        nus_email:  info.mentee_email,
                        major:      info.mentee_major,
                        tg_handle:  info.mentee_tg
                    });
                } else if (req_uid == info.mentee_uid) {
                    res.status(200).send({
                        name:       info.mentor_name,
                        photo_url:  info.mentor_photo,
                        nus_email:  info.mentor_email,
                        major:      info.mentor_major,
                        tg_handle:  info.mentor_tg
                    });
                } else {
                    res.status(403).send("No permission to view request contacts.");
                    // for some reason requester not part of request.
                }
            }
        }
    );
};

const dropmentee = (req, res) => {
    const req_id = req.params.req_id;
    const uid = req.body.uid; //mentor_id

    pool.query(
        `UPDATE Mentorship SET date_dropped = NOW() WHERE req_id = $1 AND mentor_id = $2`,
        [req_id, uid],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else {
                res.status(200).send({ message: "OK" });
            }
        }
    );
}

const markascomplete = (req, res) => {
    const req_id = req.params.req_id;
    const uid = req.body.uid;

    pool.query(
        `UPDATE Mentorship SET date_completed = NOW() WHERE req_id = $1 AND (mentor_id = $2 OR ($1, $2) IN (SELECT req_id, mentee_id FROM Requests))`,
        [req_id, uid],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else {
                res.status(200).send({ message: "OK" });
            }
        }
    );
}

const getmenteementorships = (req, res) => {
    const req_uid = req.body.uid; //requester_uid

    pool.query(
        `SELECT NOW() as time_of_request, req_id, problem_type, title, description, career_type, date_created, mentee_uid, mentee_name, mentee_photo, mentee_email, mentee_major, mentee_tg, status
         FROM MenteeContact NATURAL JOIN Requests NATURAL JOIN MentorshipMetadata
         WHERE mentor_id = $1`,
        [req_uid],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else {
                info = q_res.rows;

                res.status(200).send(info);
                // note timing info also sent as reference time in case frontend backend dif times. (relative time may be useful)
            }
        }
    );
};

const getmentormentorships = (req, res) => {
    const req_uid = req.body.uid; //requester_uid

    pool.query(
        `SELECT NOW() as time_of_request, req_id, problem_type, title, description, career_type, date_created, mentor_uid, mentor_name, mentor_photo, mentor_email, mentor_major, mentor_tg, status
         FROM MentorContact NATURAL JOIN Requests NATURAL JOIN MentorshipMetadata
         WHERE mentee_id = $1`,
        [req_uid],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else {
                info = q_res.rows;

                res.status(200).send(info);
                // note timing info also sent as reference time in case frontend backend dif times. (relative time may be useful)
            }
        }
    );
};

module.exports = {
    getcontact,
    dropmentee,
    markascomplete,
    getmenteementorships,
    getmentormentorships
};

