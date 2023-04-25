const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        bio: {
            type: String,
            required: false,
        },
        role: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role',
                default: 'user'
            }
        ],
    })
);

module.exports = User;