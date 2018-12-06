let express = require('express');
let server = express.Router();

let jsonModel = require('../../models/jsonResponseModel');
let mongoose = require('mongoose');
let artistRepo = require('../../repositories/artistRepo');

server.use('/', (req, res, next) => {
    res.contentType('application/json');
    next();
});

server.get('/artists', (req, res) => {
    const _name = req.body.name;

    if (NorU(_name)) {
        try {
            artistRepo.getArtistsByName(_name, res);
        } catch (error) {
            res.json(error);
        }
    } else {
        try {
            artistRepo.getArtists(res);
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