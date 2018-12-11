const Artist = require('../models/artist');
const Genre = require('../models/genre');

const jsonModel = require('../models/jsonResponseModel');

module.exports = class ArtistRepo {
    static createArtist(params, res) {
        Artist.findOne({ name: params[0] })
            .then((artist) => {
                if (!(artist !== null && artist !== undefined)) {
                    const newArtist = new Artist({
                        name: params[0],
                        age: params[1]
                    });

                    newArtist.save()
                        .then(() => {
                            res.status(200).json(new jsonModel('/api/artists', 'POST', 200, 'Successfully created artist.', Artist));
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel('/api/artists', 'POST', 500, 'Failed to create new artist.', Artist));
                        });
                } else {
                    res.status(500).json(new jsonModel('/api/artists', 'POST', 500, 'Artist: ' + params[0] + ' already exists!'));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel());
            });
    }

    static getArtists(res) {
        Artist.find()
            .then((artists) => {
                /**
                let artistArray = [];
                for (let artist of artists) {
                    artistArray.push({
                        'name': artist.name,
                        'age': artist.age
                    })
                }
                res.status(200).json(new jsonModel('/api/artists', 'GET', 200, 'Successfully retrieved all artists', {'artists': artistArray}));
                */
                res.status(200).json(artists);
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    static getArtistByName(name, res) {
        Artist.findOne({ name: name })
            .then((artist) => {
                res.status(200).json({artist});
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    static updateArtist(params, res) {
        Artist.findOneAndUpdate({ name: params[0] }, { $set: { name: params[1], age: params[2] }})
            .then(() => {
                res.status(200).json(new jsonModel('/api/artists', 'PUT', 200, 'The artist has been updated successfully.'));
            })
            .catch(() => {
                res.status(500).json(new jsonModel('/api/artists', 'PUT', 500, 'The artist could not be updated. (does it exists?)'));
            });
    }

    static deleteArtistByName(param, res) {
        Artist.findOneAndDelete({ name: param })
            .then(() => {
                res.status(200).json(new jsonModel('/api/artists', 'DELETE', 200, 'The artist: ' + param + ' was successfully removed.'));
            })
            .catch(() => {
                res.status(500).json(new jsonModel('/api/artists', 'DELETE', 500, 'The artist: ' + param + ' could not be removed. (does it exists?'));
            })
    }
};