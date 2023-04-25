const db = require('../models');

const Place = db.place;

exports.create = function (req, res) {
    const place = new Place({...req.body});
    place.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Place."
        });
    });
};

exports.findAll = function (req, res) {
    Place.find().then(places => {
        res.send(places);
    }
    );
}