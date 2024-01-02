const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
    getAllMatches,
    getSingleMatch,
    createMatch,
    updateMatch,
    deleteMatch,
    } = require('../controllers/matchController');
/**
 * @swagger
 * /api/v1/match:
 *   get:
 *     summary: Get all match
 *     tags: [match]
 *     responses:
 *       200:
 *         description: Returns a list of all match
 *   post:
 *     summary: Create a new match
 *     tags: [match]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team1:
 *                 type: string
 *               team2:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: The match was successfully created
 *       400:
 *         description: Invalid match data
 */
router.route('/').get(getAllMatches).post(authenticateUser, authorizePermissions('manager'), createMatch);

/**
 * @swagger
 * /api/v1/match/{id}:
 *   get:
 *     summary: Get a single match
 *     tags: [match]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The match ID
 *     responses:
 *       200:
 *         description: Returns the match
 *       404:
 *         description: Match not found
 *   patch:
 *     summary: Update a match
 *     tags: [match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The match ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team1:
 *                 type: string
 *               team2:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: The match was successfully updated
 *       400:
 *         description: Invalid match data
 *       404:
 *         description: Match not found
 *   delete:
 *     summary: Delete a match
 *     tags: [match]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The match ID
 *     responses:
 *       200:
 *         description: The match was successfully deleted
 *       404:
 *         description: Match not found
 */
router.route('/:id').get(getSingleMatch).patch(authenticateUser, authorizePermissions('manager'), updateMatch).delete(authenticateUser, authorizePermissions('manager'), deleteMatch);

module.exports = router;