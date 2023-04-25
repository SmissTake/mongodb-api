const { createPlace, findAllPlaces, findPlace, updatePlace, deletePlace } = require('../controllers/place.controller');

module.exports = (app) => {
    app.post('/place', createPlace);
    app.get('/', findAllPlaces);
    app.get('/place/:id', findPlace);
    app.patch('/place/:id', updatePlace);
    app.delete('/place/:id', deletePlace);
}