const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    title: String,
    description: String,
    history: String,
    town: String,
    is_active: Boolean,
    created_at: Date,
    likes: Number,
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