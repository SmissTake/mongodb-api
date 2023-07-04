const {
  createPlace,
  findAllPlaces,
  findPlace,
  updatePlace,
  deletePlace,
  likePlace,
  unlikePlace,
} = require("../controllers/place.controller");
const authenticateToken = require("../middlewares/authenticateToken");
const { schemaValidator } = require('../middlewares/validation.middleware');
const { placeCreateSchema, placeUpdateSchema } = require("../schemas/place.schema");
const upload = require('../middlewares/upload.middleware');
const authorizeUser = require('../middlewares/authorize.middleware');


/**
 * @swagger
 * tags:
 *   name: Place
 *   description: gestion des lieux d'urbex
 *
 * definitions:
 *    Place:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: Titre du lieu d'urbex
 *          example: Tour Eiffel
 *        images:
 *         type: array
 *         items:
 *           type: string
 *           format: binary
 *        description:
 *          type: string
 *          description: Description du lieu d'urbex
 *          example: La Tour Eiffel est une tour de fer puddlé de 324 mètres de hauteur située à Paris, à l’extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7ᵉ arrondissement.
 *        history:
 *          type: string
 *          description: Histoire du lieu d'urbex
 *          example: La tour Eiffel a été construite pour l'exposition universelle de 1889
 *        town:
 *          type: string
 *          description: Ville où se trouve le lieu d'urbex
 *          example: Paris
 *        category:
 *          type: string
 *          description: Catégorie du lieu d'urbex
 *          example: Monument historique
 *        accessibility:
 *          type: string
 *          description: Accessibilité du lieu d'urbex
 *          enum: [easy, medium, hard]
 *      required:
 *        - title
 *        - description
 *        - town
 *        - category
 *        - accessibility
 *    PlaceUpdate:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: Titre du lieu d'urbex
 *          example: Tour Eiffel
 *        images:
 *         type: array
 *         description: Tableau d'images du lieu d'urbex
 *         items:
 *           type: string
 *           format: binary
 *        removeImages:
 *          type: array
 *          description: Tableau d'images à supprimer du lieu d'urbex
 *          items:
 *            type: string
 *            description: ID de l'image à supprimer
 *        description:
 *          type: string
 *          description: Description du lieu d'urbex
 *          example: La Tour Eiffel est une tour de fer puddlé de 324 mètres de hauteur située à Paris, à l’extrémité nord-ouest du parc du Champ-de-Mars en bordure de la Seine dans le 7ᵉ arrondissement.
 *        history:
 *          type: string
 *          description: Histoire du lieu d'urbex
 *          example: La tour Eiffel a été construite pour l'exposition universelle de 1889
 *        town:
 *          type: string
 *          description: Ville où se trouve le lieu d'urbex
 *          example: Paris
 *        category:
 *          type: string
 *          description: Catégorie du lieu d'urbex
 *          example: Monument historique
 *        accessibility:
 *          type: string
 *          description: Accessibilité du lieu d'urbex
 *          enum: [easy, medium, hard]
 *    PlaceDelete:
 *      type: object
 *      properties:
 *        acknowledged:
 *          type: boolean
 *          description: Indique si la suppression a été effectuée
 *          example: true
 *        deletedCount:
 *          type: number
 *          description: Nombre de documents supprimés
 *          example: 1
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
 *       - bearerAuth: []
 *     tags:
 *       - Place
 *     requestBody:
 *       description: Informations du lieu d'urbex à créer
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/definitions/Place'
 *     responses:
 *       '200':
 *         description: Lieu d'urbex créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Place'
 * /place/{id}:
 *   get:
 *     summary: Récupère un lieu d'urbex par ID
 *     tags: [Place]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du lieu d'urbex à récupérer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lieu d'urbex récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Place'
 *       404:
 *         description: Lieu d'urbex non trouvé
 *
 *   patch:
 *     summary: Met à jour un lieu d'urbex par ID
 *     security:
 *      - bearerAuth: []
 *     tags: [Place]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du lieu d'urbex à mettre à jour
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Informations du lieu d'urbex à mettre à jour
 *       required: true
 *       content:
 *        multipart/form-data:
 *         schema:
 *           $ref: '#/definitions/PlaceUpdate'
 *     responses:
 *       200:
 *         description: Lieu d'urbex mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Place'
 *       404:
 *         description: Lieu d'urbex non trouvé
 *
 *   delete:
 *     summary: Supprime un lieu d'urbex par ID
 *     security:
 *      - bearerAuth: []
 *     tags: [Place]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du lieu d'urbex à supprimer
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lieu d'urbex supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/PlaceDelete'
 *       404:
 *         description: Place not found
 * 
 * /place/{id}/like:
 *   post:
 *     summary: Ajoute un like à un lieu d'urbex
 *     security:
 *       - bearerAuth: []
 *     tags: [Place]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du lieu d'urbex à liker
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Place'
 *       404:
 *         description: Lieu d'urbex non trouvé
 *
 * /place/{id}/unlike:
 *   post:
 *     summary: Retire un like à un lieu d'urbex
 *     security:
 *       - bearerAuth: []
 *     tags: [Place]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID du lieu d'urbex à unliker
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like retiré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Place'
 *       404:
 *         description: Lieu d'urbex non trouvé
 */

module.exports = (app) => {
  app.post("/place", authenticateToken, upload, schemaValidator(placeCreateSchema), createPlace);
  app.get("/", findAllPlaces);
  app.get("/place/:id", findPlace);
  app.patch("/place/:id", authenticateToken, authorizeUser('Place'), schemaValidator(placeUpdateSchema), updatePlace);
  app.delete("/place/:id", authenticateToken, authorizeUser('Place'), deletePlace);
  app.post("/place/:id/like", authenticateToken, likePlace);
  app.post("/place/:id/unlike", authenticateToken, unlikePlace);
};
