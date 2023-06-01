const {
  createPlace,
  findAllPlaces,
  findPlace,
  updatePlace,
  deletePlace,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/place.controller");
const authenticateToken = require("../middlewares/authenticateToken");
const { placeSchema } = require("../schemas/place.schema");

/**
 * @swagger
 * tags:
 *   name: Place
 *   description: API de gestion des lieux d'urbex
 *
 * definitions:
 *   Place:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: Titre du lieu d'urbex
 *         example: Tour Eiffel
 *       description:
 *         type: string
 *         description: Description du lieu d'urbex
 *         example: La Tour Eiffel est une tour de fer puddlé de 324 mètres de hauteur située à Paris, à l’extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7ᵉ arrondissement.
 *       history:
 *         type: string
 *         description: Histoire du lieu d'urbex
 *         example: La tour Eiffel a été construite pour l'exposition universelle de 1889
 *       town:
 *         type: string
 *         description: Ville où se trouve le lieu d'urbex
 *         example: Paris
 *       category:
 *         type: string
 *         description: Catégorie du lieu d'urbex
 *         example: Monument historique
 *     required:
 *       - title
 *       - description
 *       - town
 *       - category
 *
 * /:
 *   get:
 *     summary: Récupère la liste des lieux d'urbexs
 *     tags: [Place]
 *     responses:
 *       '200':
 *         description: Liste des lieux d'urbexs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Place'
 *
 * /place:
 *   post:
 *     summary: Crée un nouveau lieu d'urbex
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Place
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Informations du lieu d'urbex à créer
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Place'
 *     responses:
 *       '200':
 *         description: Lieu d'urbex créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Place'
 * /place/{id}:
 *   get:
 *     summary: Get a place by ID
 *     tags: [Place]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the place to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved a place
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Place'
 *       404:
 *         description: Place not found
 *
 *   patch:
 *     summary: Update a place by ID
 *     security:
 *      - bearerAuth: []
 *     tags: [Place]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the place to update
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Fields to update in the place
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Place'
 *     responses:
 *       200:
 *         description: Successfully updated the place
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Place'
 *       404:
 *         description: Place not found
 *
 *   delete:
 *     summary: Delete a place by ID
 *     security:
 *      - bearerAuth: []
 *     tags: [Place]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the place to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted the place
 *       404:
 *         description: Place not found
 */

module.exports = (app) => {
  app.post("/place", authenticateToken, schemaValidator(placeSchema), createPlace);
  app.get("/", findAllPlaces);
  app.get("/place/:id", findPlace);
  app.patch("/place/:id", authenticateToken, updatePlace);
  app.delete("/place/:id", authenticateToken, deletePlace);
  app.post("/comment/:id", authenticateToken, createComment);
  app.patch("/comment/:id", authenticateToken, updateComment);
  app.delete("/comment/:id", authenticateToken, deleteComment);
};
