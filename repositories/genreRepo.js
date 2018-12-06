const Genre = require('../src/genre');
const jsonModel = require('../models/jsonResponseModel');

module.exports = class GenresRepo {
    static getGenres(res) {
        Genre.find()
            .then((genres) => {
                let genreArray = [];
                for (let genre of genres) {
                    genreArray.push({
                        'name': genre.name
                    })
                }
                res.status(200).json({'genres': genreArray});
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    static getGenresByName(name, res) {
        Genre.find({ name: { $regex: name }})
            .then((genres) => {
                let genreArray = [];
                for (let genre of genres) {
                    genreArray.push({
                        'name': genre.name
                    })
                }
                res.status(200).json({'genres': genreArray});
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    static createGenre(params, res) {
        const newGenre = new Genre({
            name: params[0],
            description: params[1],
            origin: params[2],
            popularity: params[3]
        });

        newGenre.save()
            .then(() => {
                res.status(200).json(new jsonModel('/api/genres', 'POST', 201, 'The genres has been saved succesfully.'));
            })
            .catch(() => {
                res.status(500).json(new jsonModel());
            });
    }
};