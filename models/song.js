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

function autoPopulate(){
    this.populate('artist genre');
};

SongSchema.pre('find', autoPopulate());
SongSchema.pre('findOne', autoPopulate());

const Song = mongoose.model('song', SongSchema);

module.exports = Song;