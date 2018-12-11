const Song = require('../models/song');
const Genre = require('../models/genre');
const Artist = require('../models/artist');

const jsonModel = require('../models/jsonResponseModel');

module.exports = class SongRepo {
    static createSong(params, res) {
        Genre.findOne({ name: params[3] })
            .then((genre) => {
                Artist.findOne({ name: params[4] })
                    .then((artist) => {
                        const newSong = Song({
                            name: params[0],
                            length_s: params[1],
                            bpm: params[2],
                            genre: genre,
                            artists: artist,
                            releasedate: Date.now()
                        });

                        newSong.save()
                            .then(() => {
                                res.status(200).json(new jsonModel());
                            })
                            .catch(() => {

                            });
                    })
                    .catch(() => {

                    })
            })
            .catch(() => {

            });
    }

    static getSongs(res) {
        Song.find()
            .then((songs) => {
                /**
                let songArray = [];
                for (let song of songs) {
                    songArray.push({
                        'name': song.name
                    })
                }
                res.status(200).json({'songs': songArray});
                 */
                res.status(200).json(songs);
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    static getSongByName(name, res) {
        Song.findOne({ name: name})
            .then((song) => {
                res.status(200).json({song});
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }
};