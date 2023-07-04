const mongoose = require('mongoose');

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required:true,
        },
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
        favoritePlaces: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Place'
        }],
    })
);

module.exports = User;