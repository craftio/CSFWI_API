let express = require('express');
let server = express.Router();

let jsonModel = require('../../models/jsonResponseModel');
let mongoose = require('mongoose');
let artistRepo = require('../../repositories/artistRepo');

server.use('/', (req, res, next) => {
    res.contentType('application/json');
    next();
});

/**
 * Route for CREATE
 */
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

/**
 * Route for READ
 */
server.get('/artists', (req, res) => {
    const _name = req.body.name;

    if (NorU(_name)) {
        try {
            artistRepo.getArtistByName(_name, res);
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

server.get('/artists/:_id', (req, res) => {
    const _id = req.params._id;

    try {
        artistRepo.getArtistById(_id, res);
    } catch (error) {
        res.json(error);
    }
});

/**
 * Route for UPDATE
 */
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

    try {
        if (_noru) {
            artistRepo.updateArtist(bodyParamArray, res);
        } else {
            res.json(new jsonModel());
        }
    } catch (error) {
        res.json(error);
    }
});

/**
 * Route for DELETE
 */
server.delete('/artists', (req, res) => {
    const _name = req.body.name;

    try {
        artistRepo.deleteArtistByName(_name);
    } catch (error) {
        res.json(error);
    }
});

/**
 * Function to check if an object has any sort of definition other than a type (empty like " " is a definition).
 *
 * @param param
 * @returns {boolean}
 * @constructor
 */
function NorU(param) {
    if (param !== null && param !== undefined) {
        return true;
    }
    return false;
}

module.exports = (server);