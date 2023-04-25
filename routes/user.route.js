const { createUser, findAllUsers , findUser, updateUser, deleteUser} = require ('../controllers/user.controller');

module.exports = (app) => {
    app.post('/user', createUser);
    app.get('/users', findAllUsers);
    app.get('/user/:id', findUser);
    app.patch('/user/:id', updateUser);
    app.delete('/user/:id', deleteUser);
}