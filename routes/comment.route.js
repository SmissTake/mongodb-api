const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");
const authenticateToken = require("../middlewares/authenticateToken");
const { schemaValidator } = require('../middlewares/validation.middleware');
const { commentCreateSchema, commentUpdateSchema } = require("../schemas/comment.schema");
const upload = require('../middlewares/upload.middleware');
const authorizeUser = require('../middlewares/authorize.middleware');

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: gestion des commentaires
 * 
 * definitions:
 *   Comment:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: ID du commentaire
 *         example: 5f9d7a3b9d9b1f2b1c9d1b1a
 *       comment:
 *         type: string
 *         description: Le contenu du commentaire
 *         example: Super endroit !
 *       images:
 *         type: array
 *         items:
 *           type: string
 *           format: binary
 *         description: Les images du commentaire
 *         example: ["5f9d7a3b9d9b1f2b1c9d1b1a.jpg"]
 *       user:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             description: ID de l'utilisateur
 *             example: 5f9d7a3b9d9b1f2b1c9d1b1a
 *           username:
 *             type: string
 *             description: Le nom d'utilisateur
 *             example: JohnDoe
 *   CommentCreate:
 *     type: object
 *     properties:
 *       comment:
 *         type: string
 *         description: Le contenu du commentaire
 *         example: Super endroit !
 *       images:
 *         type: array
 *         items:
 *           type: string
 *           format: binary
 *     required:
 *       - comment
 *
 *   CommentUpdate:
 *     type: object
 *     properties:
 *       placeId:
 *         type: string
 *         description: ID du lieu
 *         example: 5f9d7a3b9d9b1f2b1c9d1b1a
 *       comment:
 *         type: string
 *         description: Le contenu du commentaire
 *         example: Super endroit !
 *       images:
 *         type: array
 *         items:
 *           type: string
 *           format: binary
 *     required:
 *       - placeId
 *       - comment
 *   CommentDelete:
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
 * /comment/{id}:
 *   post:
 *     summary: Ajoute un commentaire à un lieu
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du lieu
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Le commentaire à créer
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/definitions/CommentCreate'
 *     responses:
 *       200:
 *         description: Le commentaire créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment'
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Lieu non trouvé
 *       500:
 *         description: Erreur serveur
 *
 *   patch:
 *     summary: Met à jour un commentaire
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Le commentaire à mettre à jour
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/definitions/CommentUpdate'
 *     responses:
 *       200:
 *         description: Le commentaire a été mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment'
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Interdit
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 *
 *   delete:
 *     summary: Supprime un commentaire
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Le commentaire a été supprimé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/CommentDelete'
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Interdit
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */

module.exports = (app) => {
  app.post("/comment/:id", authenticateToken, upload, schemaValidator(commentCreateSchema), createComment);
  app.patch("/comment/:id", authenticateToken, upload, schemaValidator(commentUpdateSchema), updateComment);
  app.delete("/comment/:id", authenticateToken, authorizeUser('Comment'), deleteComment);
};