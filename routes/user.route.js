// Import the necessary controllers
const { login, register, findAllUsers , findUser, updateUser, deleteUser} = require ('../controllers/user.controller');

// Import the necessary middlewares
const { schemaValidator } = require('../middlewares/validation.middleware');
const { registerSchema, loginSchema } = require('../schemas/user.schema')
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeUser = require('../middlewares/authorize.middleware');

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
 *         example: Password1
 *       bio:
 *         type: string
 *         description: Biographie de l'utilisateur
 *         example: I'm a software developer
 *     required:
 *       - username
 *       - email
 *       - password
 *   UserReturnLogin:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: ID de l'utilisateur
 *         example: 5f9d7a3b9d9b1f2b1c9d1b1a
 *       username:
 *         type: string
 *         description: Nom d'utilisateur de l'utilisateur
 *         example: JohnDoe
 *       email:
 *         type: string
 *         description: Adresse email de l'utilisateur
 *         example: john.doe@example.com
 *       bio:
 *         type: string
 *         description: Biographie de l'utilisateur
 *         example: I'm a software developer
 *   UserReturn:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: ID de l'utilisateur
 *         example: 5f9d7a3b9d9b1f2b1c9d1b1a
 *       username:
 *         type: string
 *         description: Nom d'utilisateur de l'utilisateur
 *         example: JohnDoe
 *       email:
 *         type: string
 *         description: Adresse email de l'utilisateur
 *         example: john.doe@example.com
 *       __v:
 *         type: number
 *         description: Version du document
 *         example: 0
 *       bio:
 *         type: string
 *         description: Biographie de l'utilisateur
 *         example: I'm a software developer
 *   UserDelete:
 *     type: object
 *     properties:
 *       acknowledged:
 *         type: boolean
 *         description: Indique si la suppression a été effectuée
 *         example: true
 *       deletedCount:
 *         type: number
 *         description: Nombre de documents supprimés
 *         example: 1
 * /login:
 *   post:
 *     summary: Connecte un utilisateur existant et renvoie un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur de l'utilisateur
 *                 example: JohnDoe
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *                 example: Password1
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
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/definitions/UserReturnLogin'   
 *       401:
 *         description: Nom d'utilisateur ou mot de passe incorrect
 *       422:
 *         description: Erreur de validation
 *       500:
 *         description: Erreur interne du serveur
 *
 * /register:
 *   post:
 *     summary: Crée un nouvel utilisateur dans la base de données
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       409:
 *        description: Nom d'utilisateur ou adresse email déjà utilisé
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
 *                 $ref: '#/definitions/UserReturn'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/UserReturn"
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
 *     requestBody:
 *         description: Informations de l'utilisateur à mettre à jour
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserReturn'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/UserDelete'
 *       404:
 *         description: Utilisateur non trouvé
 *
 */

// Export the routes to be used by the app
module.exports = (app) => {
    app.post("/login", schemaValidator(loginSchema), login);
    app.post("/register", schemaValidator(registerSchema), register);

    app.get('/users', findAllUsers);
    app.get('/user/:id', findUser);
    app.patch('/user/:id', authenticateToken, authorizeUser('User'), updateUser);
    app.delete('/user/:id', authenticateToken, authorizeUser('User'), deleteUser);
}
