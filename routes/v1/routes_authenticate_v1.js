let express = require('express');
let server = express.Router();

let jsonModel = require('../../models/jsonResponseModel');
let User = require('../../models/user');

let authRepo = require('../../repositories/authRepo');

server.use('/', (req, res, next) => {
    res.contentType('application/json');
    next();
});

server.post('/register', (req, res) => {
    try {
        authRepo.registerUser(req.body.email, req.body.password, res);
    } catch (error) {
        res.json(error);
    }
});

server.post('/login', (req, res) => {
    try {
        authRepo.loginUser(req.body.email, req.body.password, res);
    } catch (error) {
        res.json(error);
    }
});

module.exports = (server);