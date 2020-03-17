const express = require('express');
// install Knex and sqlite3

// Database using knex
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    //get the data from the Database
    // then send it back to the client
    db.select('*').from('accounts')
    .then(rows => {
        res.status(200).json({ data: rows })
    })
    .catch(error => {
        res.status(500).json({ message: 'sorry, ran into an error' })
    });
});



module.exports = router;