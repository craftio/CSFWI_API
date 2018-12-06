let express = require('express');
let server = express.Router();

let jsonModel = require('../../models/jsonResponseModel');
let mongoose = require('mongoose');
let songRepo = require('../../repositories/songRepo');

server.use('/', (req, res, next) => {
    res.contentType('application/json');
    next();
});

server.get('/songs', (req, res) => {
    const _name = req.body.name;

    if (NorU(_name)) {
        try {
            songRepo.getSongsByName(_name, res);
        } catch (error) {
            res.json(error);
        }
    } else {
        try {
            songRepo.getSongs(res);
        } catch (error) {
            res.json(error);
        }
    }
});

// Check for null and/or undefined params.
function NorU(param) {
    if (param !== null && param !== undefined) {
        return true;
    }
    return false;
}

module.exports = (server);