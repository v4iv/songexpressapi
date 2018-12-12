var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: ['true', 'Song must have a title'],
    },
    artist: {
        type: String,
        required: ['true', 'Song must have an artist'],
    },
    url: {
        type: String,
        required: ['true', 'Song must have an URL'],
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
});

module.exports = mongoose.model('Song', songSchema);