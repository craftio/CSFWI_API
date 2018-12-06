const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArtistSchema = new Schema({
    name: String,
    age: Number,
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'genre'
    }]
});

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;