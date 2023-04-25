const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        bio: String,
        role: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
            }
        ],
        places: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Place'
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
    })
);

module.exports = User;