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
            songRepo.getSongByName(_name, res);
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

server.get('/songs/:_id', (req, res) => {
    const _id = req.params._id;

    try {
        songRepo.getSongById(_id, res);
    } catch (error) {
        res.json(error);
    }
});

// UPDATE
server.put('/songs/:_id', (req, res) => {
    const _id = req.params._id;
});

// DELETE
server.delete('/songs/:_id', (req, res) => {
    const _id = req.params._id;

    try {
        songRepo.deleteSongById(_id, res);
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