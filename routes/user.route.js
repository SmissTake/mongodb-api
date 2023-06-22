// Import the necessary controllers
const { login, register, findAllUsers , findUser, updateUser, deleteUser} = require ('../controllers/user.controller');

// Import the necessary middlewares
const { schemaValidator } = require('../middlewares/validation.middleware');
const { registerSchema, loginSchema } = require('../schemas/user.schema')
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
 *     required:
 *       - username
 *       - email
 *       - password
 *
 * /login:
 *   post:
 *     summary: Connecte un utilisateur existant et renvoie un token JWT
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Informations de l'utilisateur à créer
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Succès - renvoie un token JWT au format Bearer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT au format Bearer
 *       401:
 *         description: Nom d'utilisateur ou mot de passe incorrect
 *
 * /register:
 *   post:
 *     summary: Crée un nouvel utilisateur dans la base de données
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Informations de l'utilisateur à créer
 *         required: true
 *         schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       500:
 *         description: Erreur interne du serveur
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
 *
 * /user:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Informations de l'utilisateur à créer
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
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
 *   patch:
 *     summary: Met à jour un utilisateur existant
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur à mettre à jour.
 *         type: string
 *       - in: body
 *         name: body
 *         description: Informations de l'utilisateur à mettre à jour
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: Utilisateur non trouvé - L'identifiant fourni ne correspond à aucun utilisateur existant.
 *       500:
 *         description: Erreur lors de la mise à jour de l'utilisateur.
 *   delete:
 *     summary: Supprime un utilisateur existant
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant de l'utilisateur à supprimer.
 *         type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: Utilisateur non trouvé
 *
 */

// Export the routes to be used by the app
module.exports = (app) => {
    app.post("/login", schemaValidator(loginSchema), login);
    // app.post("/register", schemaValidator(registerSchema), register);
    // app.post("/login", login);
    app.post("/register", register);

    app.get('/users', findAllUsers);
    app.get('/user/:id', findUser);
    app.patch('/user/:id', updateUser);
    app.delete('/user/:id', deleteUser);
}
