let express = require('express');
let server = express.Router();

let jsonModel = require('../../models/jsonResponseModel');
let mongoose = require('mongoose');
let artistRepo = require('../../repositories/artistRepo');

server.use('/', (req, res, next) => {
    res.contentType('application/json');
    next();
});

server.post('/artists', (req, res) => {
    const bodyParamArray = [
        req.body.name,
        req.body.age
    ];

    let _noru = true;
    bodyParamArray.forEach((param) => {
        if (!NorU(param)) {
            _noru = false;
        }
    });

    try {
        if (_noru) {
            artistRepo.createArtist(bodyParamArray, res);
        } else {
            res.json(new jsonModel('/api/artists', 'POST', 500, 'Could not create artist due to possibly missing fields "name" and "age".'));
        }
    } catch (error) {
        res.json(error);
    }
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

server.put('/artists', (req, res) => {
    const bodyParamArray = [
        req.body.name,
        req.body.age
    ];

    let _noru = true;
    bodyParamArray.forEach((param) => {
        if (!NorU(param)) {
            _noru = false;
        }
    });
});

// Check for null and/or undefined params.
function NorU(param) {
    if (param !== null && param !== undefined) {
        return true;
    }
    return false;
}

module.exports = (server);