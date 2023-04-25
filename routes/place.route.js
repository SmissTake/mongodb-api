const { add, findAll } = require('../controllers/place.controller');

module.exports = (app) => {
    app.get('/addplace', add);
    app.get('/', findAll);
}