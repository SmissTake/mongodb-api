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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    const placeId = req.params.id;

    Place.findById(placeId).then(place => {
        if (!place) {
            return res.status(404).send({
                message: "Place not found with id " + placeId
            });
        }
        if (place.user.toString() !== userId) { // check if user ID matches
            return res.status(403).send({
                message: "You are not authorized to update this place"
            });
        }

        Place.findByIdAndUpdate(placeId, req.body, { new: true }).then(updatedPlace => {
            res.send(updatedPlace);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the Place."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while finding the Place."
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