const Song = require('../src/song');
const jsonModel = require('../models/jsonResponseModel');

module.exports = class SongRepo {
    static getSongs(res) {
        Song.find()
            .then((songs) => {
                let songArray = [];
                for (let song of songs) {
                    songArray.push({
                        'name': song.name
                    })
                }
                res.status(200).json({'songs': songArray});
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    static getSongsByName(name, res) {
        Song.find({ name: { $regex: name }})
            .then((songs) => {
                let songArray = [];
                for (let song of songs) {
                    songArray.push({
                        'name': song.name
                    })
                }
                res.status(200).json({'songs': songArray});
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }
};