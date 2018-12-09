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
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'genre'
    }
});

function autoPopulate(){
    this.populate('artist genre');
};

SongSchema.pre('find', autoPopulate());
SongSchema.pre('findOne', autoPopulate());

const Song = mongoose.model('song', SongSchema);

module.exports = Song;