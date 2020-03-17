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

router.post('/', (req, res) => {
    db('accounts')
    .insert(req.body, 'id')
    .then(ids => {
        res.status(201).json({ results: ids })
    })
    .catch(error => {
        res.status(500).json({ message: 'sorry, ran into an error' })
    });
})

router.get('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
        if (account) {
            res.status(200).json({ data: account })
        } else {
            res.status(404).json({ message: 'Account not found!' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'sorry, ran into an error' })
    });
})

router.delete('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'Record Deleted successfully' })
        } else {
            res.status(404).json({ message: 'Account not found!' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'sorry, ran into an error' })
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;

    db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'Account UPDATED successfully' })
        } else {
            res.status(404).json({ message: 'Account not found!' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'sorry, ran into an error' })
    });
})

module.exports = router;