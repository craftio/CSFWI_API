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

var autoPopulate = function(next) {
    this.populate('genres');
    next();
};

ArtistSchema.pre('find', autoPopulate);
ArtistSchema.pre('findOne', autoPopulate);

const Artist = mongoose.model('artist', ArtistSchema);

module.exports = Artist;