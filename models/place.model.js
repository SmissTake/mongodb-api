const mongoose = require('mongoose');

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
    // comments: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment',
    //     required: false
    // }],
    // images: [{
    //     url: String,
    // }],
    // user: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // }],
});
const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;