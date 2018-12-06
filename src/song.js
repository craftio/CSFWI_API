const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    name: String,
    artists: [{
        type: Schema.Types.ObjectId,
        ref: 'artist'
    }],
    length_s: Number,
    releasedate: Date,
    bpm: Number,
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'genre'
    }]
});

const Song = mongoose.model('song', SongSchema);

module.exports = Song;