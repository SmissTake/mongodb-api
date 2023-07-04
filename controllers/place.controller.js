const db = require('../models');
const jwt = require('jsonwebtoken');

const Place = db.place;
const User = db.user;
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
    .populate('comments.user', 'username')
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
    .populate('comments.user', 'username')
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
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the Place."
                    });
                });
            }).catch(err => {
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

exports.likePlace = function (req, res) {
  const placeId = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;

  // Find the place document by id and increment the like count
  Place.findByIdAndUpdate(placeId, { $inc: { likes: 1 } }, { new: true })
    .then(place => {
      if (!place) {
        return res.status(404).send({
          message: "Place not found with id " + placeId
        });
      }

      // Find the user document by id and add the place id to the favoritePlaces array
      User.findById(userId)
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: "User not found with id " + userId
            });
          }

          // Check if the placeId already exists in the favoritePlaces array
          if (user.favoritePlaces.includes(placeId)) {
            return res.status(400).send({
              message: "Place already liked by user"
            });
          }

          // Add the placeId to the favoritePlaces array
          user.favoritePlaces.push(placeId);
          user.save()
            .then(() => {
              res.send({ place, user });
            }).catch(err => {
              res.status(500).send({
                message: err.message || "Some error occurred while liking the Place."
              });
            });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while liking the Place."
          });
        });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while liking the Place."
      });
    });
};

exports.unlikePlace = function (req, res) {
  const placeId = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;

  // Find the place document by id and decrement the like count
  Place.findByIdAndUpdate(placeId, { $inc: { likes: -1 } }, { new: true })
    .then(place => {
      if (!place) {
        return res.status(404).send({
          message: "Place not found with id " + placeId
        });
      }

      // Find the user document by id and remove the place id from the favoritePlaces array
      User.findById(userId)
        .then(user => {
          if (!user) {
            return res.status(404).send({
              message: "User not found with id " + userId
            });
          }

          // Check if the placeId exists in the favoritePlaces array
          if (!user.favoritePlaces.includes(placeId)) {
            return res.status(400).send({
              message: "Place not liked by user"
            });
          }

          // Remove the placeId from the favoritePlaces array
          user.favoritePlaces.pull(placeId);
          user.save()
            .then(() => {
              res.send({ place, user });
            }).catch(err => {
              res.status(500).send({
                message: err.message || "Some error occurred while unliking the Place."
              });
            });
        }).catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while unliking the Place."
          });
        });
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while unliking the Place."
      });
    });
};