const db = require('../models');

const Place = db.place;

exports.createPlace = function (req, res) {
    const place = new Place({...req.body});
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