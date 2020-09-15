const getData = (req, res, db) => {
  db.query('SELECT * FROM test', (error, results) => {
    if (error) {
      console.log(error);
    }
    res.json(results.rows);
  });
}

module.exports = {
  getData
}