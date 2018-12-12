const Genre = require('../models/genre');
const jsonModel = require('../models/jsonResponseModel');
const NorU = require('../globalfunctions/noru');

/**
 * HTTP Response Codes used:
 *
 * 1xx:
 *
 *
 * 2xx:
 *  200, 201
 *
 * 3xx:
 *
 *
 * 4xx:
 *  404, 412
 *
 * 5xx:
 *  500
 *
 */

module.exports = class GenresRepo {

    /**
     * POST genre.
     *
     * @param params
     * @param res
     */
    static createGenre(params, res) {
        Genre.findOne({ name: params[0] })
            .then((genre) => {
                if (!(genre !== null && genre !== undefined)) {
                    const newGenre = new Genre({
                        name: params[0],
                        description: params[1],
                        origin: params[2],
                        popularity: params[3]
                    });

                    newGenre.save()
                        .then(() => {
                            res.status(201).json(new jsonModel('/api/genres', 'POST', 201, 'The genre has been saved successfully.'));
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel('/api/genres', 'POST', 500, 'The genre couldn\'t be saved due to unforeseen circumstances.'));
                        });
                } else {
                    res.status(412).json(new jsonModel('/api/genres', 'POST', 500, 'The genre already exists.'));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel('/api/genres', 'POST', 500, 'The genre couldn\'t be saved due to unforeseen circumstances.'));
            });
    }

    /**
     * GET genres.
     *
     * @param res
     */
    static getGenres(res) {
        Genre.find()
            .then((genres) => {
                if (genres.length > 0) {
                    /**
                        let genreArray = [];
                        for (let genre of genres) {
                            genreArray.push({
                                'name': genre.name
                            })
                        }
                        res.status(200).json({'genres': genreArray});
                     */
                    res.status(200).json(genres);
                }
                res.status(404).json(new jsonModel());
            })
            .catch(() => {
                res.status(500).json(new jsonModel());
            });
    }

    static getGenreById(_id, res) {
        Genre.findOne({ _id: _id })
            .then((genre) => {
                if (NorU(genre)) {
                    res.status(200).json(genre);
                } else {
                    res.status(404).json(new jsonModel());
                }
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    /**
     * GET specific genre (by name).
     *
     * @param name
     * @param res
     */
    static getOneGenreByName(name, res) {
        Genre.findOne({ name: name})
            .then((genre) => {
                if (NorU(genre)) {
                    res.status(200).json({genre});
                } else {
                    res.status(404).json(new jsonModel());
                }
            })
            .catch(() => {
                res.status(404).json(new jsonModel());
            });
    }

    /**
     * PUT specific genre.
     *
     * @param params
     * @param res
     */
    static updateGenre(_id, params, res) {
        Genre.findOneAndUpdate({ _id: _id }, { $set: { name: params[0], description: params[1], origin: params[2], popularity: params[3] }})
            .then(() => {
                res.status(200).json(new jsonModel('/api/genres', 'PUT', 200, 'The genre was successfully updated.'));
            })
            .catch(() => {
                res.status(500).json(new jsonModel('/api/genres', 'PUT', 500, 'The genre could not be updated (does it exist?)'));
            })
    }

    static deleteGenreById(_id, res) {
        Genre.findOneAndDelete({ _id: _id })
            .then(() => {
                res.status(200).json(new jsonModel('/api/genres/:_id'));
            })
            .catch(() => {
                res.status(500).json(new jsonModel());
            })
    }

    /**
     * DELETE genre (by name).
     *
     * @param param
     * @param res
     */
    static deleteGenreByName(param, res) {
        Genre.findOneAndDelete({ name: param })
            .then(() => {
                res.status(200).json(new jsonModel('/api/genres', 'DELETE', 200, 'The genre: ' + param +' was successfully removed.'));
            })
            .catch(() => {
                res.status(500).json(new jsonModel('/api/genres', 'DELETE', 200, 'The genre: ' + param +' could not be removed. (does it exist?)'))
            });
    }
};