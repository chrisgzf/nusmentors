const pool = require('path_to_psql_db');

module.exports = (req, res) => {
    
    pool.query('SELECT DISTINCT career_type FROM CareerTypes ORDER BY career_type ASC',
        (q_err, q_res) => {
            if (q_err) {
                res.status(500).send(q_err)
            } else {
                res.json(q_res.rows) // TODO: insert shenanigans to process data into sth prettier
            }
        })
};

