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
 * 
 * /comment/{id}:
 *   post:
 *     summary: Create a new comment for a place
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the place to add the comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The comment to create
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/definitions/CommentCreate'
 *     responses:
 *       200:
 *         description: The created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Place not found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     summary: Update a comment for a place
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The comment to create
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/definitions/CommentUpdate'
 *     responses:
 *       200:
 *         description: The updated comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a comment for a place
 *     tags:
 *       - Comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The deleted comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Comment'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

module.exports = (app) => {
  app.post("/comment/:id", authenticateToken, upload, schemaValidator(commentCreateSchema), createComment);
  app.patch("/comment/:id", authenticateToken, upload, schemaValidator(commentUpdateSchema), updateComment);
  app.delete("/comment/:id", authenticateToken, authorizeUser('Comment'), deleteComment);
};