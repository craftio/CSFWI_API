const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    name: String,
    length_s: Number,
    bpm: Number,
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'genre'
    },
    artists: [{
        type: Schema.Types.ObjectId,
        ref: 'artist'
    }],
    releasedate: Date
});

var autoPopulate = function(next) {
    this.populate('artist genre');
    next();
};

SongSchema.pre('find', autoPopulate);
SongSchema.pre('findOne', autoPopulate);

const Song = mongoose.model('song', SongSchema);

module.exports = Song;