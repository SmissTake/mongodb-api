// Import the necessary controllers
const { createUser, findAllUsers , findUser, updateUser, deleteUser} = require ('../controllers/user.controller');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API de gestion des utilisateurs
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *         description: Nom d'utilisateur de l'utilisateur
 *         example: JohnDoe
 *       email:
 *         type: string
 *         description: Adresse email de l'utilisateur
 *         example: john.doe@example.com
 *       password:
 *         type: string
 *         description: Mot de passe de l'utilisateur
 *         example: mysecretpassword
 *       bio:
 *         type: string
 *         description: Biographie de l'utilisateur
 *         example: I'm a software developer
 *       role:
 *         type: array
 *         description: Rôles de l'utilisateur
 *         items:
 *           type: string
 *           example: user
 *     required:
 *       - username
 *       - email
 *       - password
 *
 * /users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       '200':
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *
 * /user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par son identifiant.
 *     description: Récupère un utilisateur existant en utilisant son identifiant.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur à récupérer.
 *         type: string
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès.
 *         schema:
 *           $ref: "#/definitions/User"
 *       404:
 *         description: Utilisateur non trouvé - L'identifiant fourni ne correspond à aucun utilisateur existant.
 *       500:
 *         description: Erreur lors de la récupération de l'utilisateur.
 *
 */

// Export the routes to be used by the app
module.exports = (app) => {
    app.post('/user', createUser);
    app.get('/users', findAllUsers);
    app.get('/user/:id', findUser);
    app.patch('/user/:id', updateUser);
    app.delete('/user/:id', deleteUser);
}
