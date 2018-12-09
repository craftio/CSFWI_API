let express = require('express');
let server = express.Router();

let jsonModel = require('../../models/jsonResponseModel');
let mongoose = require('mongoose');
let songRepo = require('../../repositories/songRepo');

server.use('/', (req, res, next) => {
    res.contentType('application/json');
    next();
});

// CREATE
server.post('/songs', (req, res) => {
    const bodyParamArray = [
        req.body.name,
        req.body.length_s,
        req.body.bpm,
        req.body.genre,
        req.body.artists
    ];

    let _noru = true;
    bodyParamArray.forEach((param) => {
        if (!NorU(param)) {
            _noru = false;
        }
    });

    try {
        if (_noru) {
            songRepo.createSong(bodyParamArray, res);
        } else {
            res.json(new jsonModel());
        }
    } catch (error) {
        res.json(error);
    }
});

// READ
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

// UPDATE
server.put('/songs/:id', (req, res) => {

});

// DELETE
server.delete('/songs/:id', (req, res) => {
    
});

// Check for null and/or undefined params.
function NorU(param) {
    if (param !== null && param !== undefined) {
        return true;
    }
    return false;
}

module.exports = (server);