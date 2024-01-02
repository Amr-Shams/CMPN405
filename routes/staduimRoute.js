const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const {
    createStadium,
    getAllStadiums,
    getSingleStadium,
    updateStadium,
    deleteStadium
} = require('../controllers/staduimController');

/**
 * @swagger
 * /api/v1/stadiums:
 *   get:
 *     summary: Get all stadiums
 *     tags: [Stadiums]
 *     responses:
 *       200:
 *         description: Returns a list of all stadiums
 *   post:
 *     summary: Create a new stadium
 *     tags: [Stadiums]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: The stadium was successfully created
 *       400:
 *         description: Invalid stadium data
 */
router.route('/').get(getAllStadiums).post(authenticateUser, authorizePermissions('admin'), createStadium);

/**
 * @swagger
 * /api/v1/stadiums/{id}:
 *   get:
 *     summary: Get a single stadium
 *     tags: [Stadiums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stadium ID
 *     responses:
 *       200:
 *         description: Returns the stadium
 *       404:
 *         description: Stadium not found
 *   patch:
 *     summary: Update a stadium
 *     tags: [Stadiums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stadium ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: The stadium was successfully updated
 *       400:
 *         description: Invalid stadium data
 *       404:
 *         description: Stadium not found
 *   delete:
 *     summary: Delete a stadium
 *     tags: [Stadiums]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stadium ID
 *     responses:
 *       200:
 *         description: The stadium was successfully deleted
 *       404:
 *         description: Stadium not found
 */
router.route('/:id').get(getSingleStadium).patch(authenticateUser, authorizePermissions('admin'), updateStadium).delete(authenticateUser, authorizePermissions('admin'), deleteStadium);

module.exports = router;
