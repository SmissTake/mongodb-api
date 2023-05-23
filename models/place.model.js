const mongoose = require('mongoose');

const Comment = require('./comment.model');

const PlaceSchema = new mongoose.Schema({
    title: String,
    description: String,
    history: String,
    town: String,
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    likes : {
        type: Number,
        default: 0
    },
    category: String,
    accessibility: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy'
    },
    comments: [Comment],
    images: [{
        url: String,
    }],
});
const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;