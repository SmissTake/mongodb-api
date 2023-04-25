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
            required: true,
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
    })
);

module.exports = User;