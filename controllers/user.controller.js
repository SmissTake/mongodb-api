const db = require('../models');

const User = db.user;

exports.createUser = function (req, res) {
    const user = new User({...req.body});
    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        })
    })
}

exports.findAllUsers = function (req, res) {
    User.find().then(data => {
        res.send(data);
    });
}

exports.findUser = function (req, res) {
    User.findById(req.params.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the User."
        })
    })
}

exports.updateUser = function (req, res) {
    User.updateOne({_id: req.params.id}, {...req.body}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the User."
        })
    })
}

exports.deleteUser = function (req, res) {
    User.deleteOne({_id: req.params.id}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the User."
        })
    })
}