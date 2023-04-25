const mongoose = require('mongoose');

const Comment = mongoose.model(
    'Comment',
    new mongoose.Schema({
        comment: String,
        created_at: Date,
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        image: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Image'
            }
        ],
        place: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Place'
            }
        ],
    })
);

module.exports = Comment;