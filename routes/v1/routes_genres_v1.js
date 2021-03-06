let express = require('express');
let server = express.Router();

let jsonModel = require('../../models/jsonResponseModel');
let mongoose = require('mongoose');
let genreRepo = require('../../repositories/genreRepo');

server.use('/', (req, res, next) => {
    res.contentType('application/json');
    next();
});

server.get('/genres', (req, res) => {
    const _name = req.body.name;

    if (NorU(_name)) {
        try {
            genreRepo.getGenresByName(_name, res);
        } catch (error) {
            res.json(error);
        }
    } else {
        try {
            genreRepo.getGenres(res);
        } catch (error) {
            res.json(error);
        }
    }
});

server.post('/genres', (req, res) => {
    const bodyParamArray = [
        req.body.name,
        req.body.description,
        req.body.origin,
        req.body.popularity
    ];

    let _noru = true;
    bodyParamArray.forEach((param) => {
        if (!NorU(param)) {
            _noru = false;
        }
    });

    try {
        if (_noru) {
            genreRepo.createGenre(bodyParamArray, res);
        } else {
            // Change this.
            res.json(new jsonModel("hi", "no", 200, "werkt nie"));
        }
    } catch (error) {
        res.json(error);
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