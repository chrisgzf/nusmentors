const pool = require('../../db');

const createnewuser = (req, res) => {
    const fbuid       = req.body.uid;
    const name        = req.body.name;
    const nusemail    = req.body.nus_email;
    const email       = req.body.email;
    const photo_url   = req.body.photo_url;
    const matric_date = req.body.matric_date;
    const grad_date   = req.body.graduate_in;
    const major       = req.body.major;
    const telegram    = req.body.tg_handle;

    pool.query(
        `INSERT INTO UsersInfo(user_id, name, nus_email, email, photo_url, matric_date, grad_date, major, telegram) 
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [fbuid, name, nusemail, email, photo_url, matric_date, grad_date, major, telegram],
        (q_err, q_res) => {
            if (q_err) {
                // uid/email not unique
                res.status(409).send(q_err.message || q_err);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

const updatenusemail = (req, res) => {
    const uid      = req.body.uid;
    const nusemail = req.body.email;
    
    pool.query(
        `UPDATE UsersInfo SET nus_email = $2 WHERE user_id = $1`,
        [uid, nusemail],
        (q_err, q_res) => {
            if (q_err) {
                // email not unique
                res.status(409).send(q_err.message || q_err);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

const verifyemail = (req, res) => {
    const uid      = req.body.uid;
    const nusemail = req.body.email;
    
    pool.query(
        `CALL verifyEmail($1, $2)`,
        [uid, nusemail],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

const checkifverified = (req, res) => {
    const uid = req.body.uid;

    pool.query(
        `SELECT is_verified_email FROM UsersInfo WHERE user_id = $1`,
        [uid],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else {
                res.json(q_res.rows[0].is_verified_email);
            }
        }
    );
};

const getuserinfo = (req, res) => {
    const uid = req.body.uid;

    pool.query(
        `SELECT name, photo_url, nus_email, matric_date, grad_date, major, telegram FROM UsersInfo WHERE user_id = $1`,
        [uid],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else if (q_res.rows.length == 0) {
                res.status(500).send("request does not exist.");
            } else {
                res.json(q_res.rows[0]);
            }
        }
    );
};

const updateinfo = (req, res) => {
    const uid       = req.body.uid;
    const name      = req.body.name;
    const photo_url = req.body.photo_url;
    const grad_date = req.body.graduate_in;
    const major     = req.body.major;
    const tg        = req.body.tg_handle;

    pool.query(
        `UPDATE UsersInfo
         SET name=COALESCE($2,name), photo_url=COALESCE($3,photo_url),
             grad_date=COALESCE($4,grad_date), major=COALESCE($5,major),
             telegram=COALESCE($6,telegram)
         WHERE user_id = $1`,
        [uid, name, photo_url, grad_date, major, tg],
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err.message || q_err);
            } else {
                res.sendStatus(200);
            }
        }
    );
};

// TODO if needed
const authenticate= (req, res) => {
    res.send("currently a placeholder. implement if needed.");
};

module.exports = {
    createnewuser: createnewuser,
    updatenusemail: updatenusemail,
    verifyemail: verifyemail,
    checkifverified: checkifverified,
    getuserinfo: getuserinfo,
    updateinfo: updateinfo,
    authenticate: authenticate
};

