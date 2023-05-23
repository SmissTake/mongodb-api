const db = require('../models');
const jwt = require('jsonwebtoken');

const Place = db.place;

exports.createPlace = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;

    const place = new Place({
        ...req.body,
        user: userId
    });
    place.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Place."
        });
    });
};

exports.findAllPlaces = function (req, res) {
    Place.find()
    .where({ is_active: true })
    .then(places => {
        res.send(places);
    }
    );
}

exports.findPlace = function (req, res) {
    Place.findById(req.params.id).then(place => {
        res.send(place);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the Place."
        });
    });
}

exports.updatePlace = function (req, res) {
    Place.updateOne({_id: req.params.id}, {...req.body})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the Place."
        });
    });
}

exports.deletePlace = function (req, res) {
    Place.deleteOne({_id: req.params.id})
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Place."
        });
    });
}