const Artist = require('../src/artist');
const jsonModel = require('../models/jsonResponseModel');

module.exports = class ArtistRepo {
    static getArtists(res) {
        Artist.find()
            .then((artists) => {
                let artistArray = [];
                for (let artist of artists) {
                    artistArray.push({
                        'name': artist.name
                    })
                }
                res.status(200).json({'artists': artistArray});
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    static getArtistsByName(name, res) {
        Artist.find({ name: { $regex: name }})
            .then((artists) => {
                let artistArray = [];
                for (let artist of artists) {
                    artistArray.push({
                        'name': artist.name
                    })
                }
                res.status(200).json({'artists': artistArray});
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }
};