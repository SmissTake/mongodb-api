const { createPlace, findAllPlaces, updatePlace, deletePlace } = require('../controllers/place.controller');

module.exports = (app) => {
    app.post('/place', createPlace);
    app.get('/', findAllPlaces);
    app.patch('/place/:id', updatePlace);
    app.delete('/place/:id', deletePlace);
}