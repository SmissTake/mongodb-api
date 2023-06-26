const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

function authorizeUser(entityName) {
  return function(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;

    // Get the model by name
    const Model = mongoose.model(entityName);

    // Find the resource by ID
    Model.findById(req.params.id).then(entity => {
      if (!entity) {
        return res.status(404).send({
          message: `${entityName} not found with id ${req.params.id}`
        });
      }

      // if entity is "user", check if the user is the same as the one in the token
      if (entityName === 'User' && entity._id.toString() !== userId) {
        return res.status(403).send({
          message: "You are not authorized to modify this resource"
        });
      }
      // Check if the user is authorized to modify the resource
      else if (entity.user && entity.user.toString() !== userId) {
        return res.status(403).send({
          message: "You are not authorized to modify this resource"
        });
      }

      next();
    }).catch(err => {
      res.status(500).send({
        message: err.message || `Some error occurred while finding the ${entityName}.`
      });
    });
  };
}

module.exports = authorizeUser;