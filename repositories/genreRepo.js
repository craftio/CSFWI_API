const Genre = require('../models/genre');
const jsonModel = require('../models/jsonResponseModel');

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
                            res.status(200).json(new jsonModel('/api/genres', 'POST', 201, 'The genre has been saved successfully.'));
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel('/api/genres', 'POST', 500, 'The genre couldn\'t be saved due to unforeseen circumstances.'));
                        });
                } else {
                    res.status(500).json(new jsonModel('/api/genres', 'POST', 500, 'The genre already exists.'));
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
    static getGenreByName(name, res) {
        Genre.findOne({ name: name})
            .then((genre) => {
                res.status(200).json({genre});
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
    static updateGenre(params, res) {
        Genre.findOneAndUpdate({ name: params[0] }, { $set: { name: params[1], description: params[2], origin: params[3], popularity: params[4] }})
            .then(() => {
                res.status(200).json(new jsonModel('/api/genres', 'PUT', 200, 'The genre was successfully updated.'));
            })
            .catch(() => {
                res.status(500).json(new jsonModel('/api/genres', 'PUT', 500, 'The genre could not be updated (does it exist?)'));
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