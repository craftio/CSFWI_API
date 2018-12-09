const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GenreSchema = new Schema({
    name: String,
    description: String,
    origin: {
        type: String,
        enum: [
            'NORTH-AMERICA',
            'SOUTH-AMERICA',
            'WEST-EUROPE',
            'EAST-EUROPE',
            'AFRICA',
            'MIDDLE-EAST',
            'WEST-ASIA',
            'EAST-ASIA',
            'SOUTH-ASIA',
            'OCEANIA',
            'UNKNOWN'
        ],
        default: 'UNKNOWN'
    },
    popularity: {
        type: String,
        enum: ['HIGH', 'MEDIUM', 'LOW', 'FRESH'],
        default: 'FRESH'
    }
});

const Genre = mongoose.model('genre', GenreSchema);

module.exports = Genre;