const express = require("express");



const Router = require('../data/router.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', Router);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running' })
})

module.exports = server;
