const db = require('../models');
const jwt = require('jsonwebtoken');

const Place = db.place;
const Comment = db.comment;

exports.createComment = function (req, res) {
  const placeId = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;

  Place.findById(placeId).then(place => {
      if (!place) {
          return res.status(404).send({
              message: "Place not found with id " + placeId
          });
      }

      place.comments.push({
          ...req.body,
          user: userId
      });

      place.save().then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Comment."
          });
      });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while finding the Place."
      });
  });
}

exports.updateComment = function (req, res) {
  const placeId = req.body.placeId;
  const commentId = req.params.id;

  Place.findById(placeId).then(place => {
      if (!place) {
          return res.status(404).send({
              message: "Place not found with id " + placeId
          });
      }

      const comment = place.comments.id(commentId);
      if (!comment) {
        return res.status(404).send({
          message: "Comment not found with id " + commentId
        });
      }

      // Modify the comment subdocument directly
      comment.comment = req.body.comment;
      comment.images = req.body.images;

      // Save the place document with the modified comment
      place.save().then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while updating the Comment."
        });
      });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while updating the Comment."
      });
  });
};

exports.deleteComment = function (req, res) {
  const placeId = req.body.placeId;
  const commentId = req.params.id;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.userId;

  Place.findById(placeId).then(place => {
      if (!place) {
          return res.status(404).send({
              message: "Place not found with id " + placeId
          });
      }

      const comment = place.comments.id(commentId);
      if (!comment) {
          return res.status(404).send({
              message: "Comment not found with id " + commentId
          });
      }

      if (comment.user.toString() !== userId) {
          return res.status(403).send({
              message: "You are not authorized to delete this comment"
          });
      }

      comment.deleteOne();

      place.save().then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while deleting the Comment."
          });
      });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while deleting the Comment."
      });
  });
};