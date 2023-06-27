const db = require('../models');
const jwt = require('jsonwebtoken');

const Place = db.place;
const uploadMiddleware = require('../middlewares/upload.middleware');

exports.createPlace = function (req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;

    const place = new Place({
        ...req.body,
        user: userId
    });

    console.log(req.body);
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
    .populate('user', 'username')
    .where({ is_active: true })
    .then(places => {
        res.send(places);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the Places."
        });
    });
}

exports.findPlace = function (req, res) {
    Place.findById(req.params.id)
    .populate('user', 'username')
    .where({ is_active: true })
    .then(place => {
        res.send(place);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the Place."
        });
    });
}

exports.updatePlace = function (req, res) {
    const placeId = req.params.id;

    Place.findById(placeId).then(place => {
        if (!place) {
            return res.status(404).send({
                message: "Place not found with id " + placeId
            });
        }

        uploadMiddleware(req, res, function (err) {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while uploading the image."
                });
            }

            Place.findByIdAndUpdate(placeId, req.body, { new: true }).then(updatedPlace => {
                if (req.body.removeImages && Array.isArray(req.body.removeImages)) {
                    req.body.removeImages.forEach(image => {
                        const imageIndex = place.images.findIndex(img => img._id.toString() === image);
                        if (imageIndex !== -1) {
                            fs.unlink(place.images[imageIndex].url, err => {
                                if (err) {
                                    console.log("here3");
                                    console.error(err);
                                }
                            });
                            place.images.splice(imageIndex, 1);
                        }
                    });
                }

                if (req.files && req.files.length > 0) {
                    updatedPlace.images = req.files.map(file => ({ url: file.path }));
                }

                updatedPlace.save().then(data => {
                    res.send(data);
                }).catch(err => {
                    console.log("here2");
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the Place."
                    });
                });
            }).catch(err => {
                console.log("here1");
                res.status(500).send({
                    message: err.message || "Some error occurred while updating the Place."
                });
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while finding the Place."
        });
    });
};

exports.deletePlace = function (req, res) {
    const placeId = req.params.id;
    
    Place.deleteOne({_id: placeId}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the Place."
        });
    });
};