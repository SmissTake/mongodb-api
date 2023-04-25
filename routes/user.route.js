const { createUser, findAllUsers , findUser, updateUser, deleteUser} = require ('../controllers/user.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Nom d'utilisateur
 *         email:
 *           type: string
 *           description: Adresse email
 *         password:
 *           type: string
 *           description: Mot de passe
 *         bio:
 *           type: string
 *           description: Biographie de l'utilisateur
 *         role:
 *           type: array
 *           items:
 *             type: string
 *           description: Rôle de l'utilisateur
 *       required:
 *         - username
 *         - email
 *         - password
 *
 * /user:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 * /user/{id}:
 *   get:
 *     summary: Récupère les informations d'un utilisateur
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   patch:
 *     summary: Met à jour un utilisateur existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   delete:
 *     summary: Supprime un utilisateur existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Utilisateur supprimé avec succès
 */

module.exports = (app) => {
    app.post('/user', createUser);
    app.get('/users', findAllUsers);
    app.get('/user/:id', findUser);
    app.patch('/user/:id', updateUser);
    app.delete('/user/:id', deleteUser);
}