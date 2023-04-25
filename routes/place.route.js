const { create, findAll } = require('../controllers/place.controller');

module.exports = (app) => {
    app.post('/place', create);
    app.get('/', findAll);
}