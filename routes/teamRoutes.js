const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
    getAllTeams,
    getSingleTeam,
    createTeam,
    updateTeam,
    deleteTeam,
    } = require('../controllers/teamController');
/**
 * @swagger
 * /api/v1/team:
 *   get:
 *     summary: Get all team
 *     tags: [team]
 *     responses:
 *       200:
 *         description: Returns a list of all team
 *   post:
 *     summary: Create a new team
 *     tags: [team]
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
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The team was successfully created
 *       400:
 *         description: Invalid team data
 */
router.route('/').get(getAllTeams).post(authenticateUser, authorizePermissions('manager'), createTeam);

/**
 * @swagger
 * /api/v1/team/{id}:
 *   get:
 *     summary: Get a single team
 *     tags: [team]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
 *     responses:
 *       200:
 *         description: Returns the team
 *       404:
 *         description: Team not found
 *   patch:
 *     summary: Update a team
 *     tags: [team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The team was successfully updated
 *       400:
 *         description: Invalid team data
 *       404:
 *         description: Team not found
 *   delete:
 *     summary: Delete a team
 *     tags: [team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The team ID
 *     responses:
 *       200:
 *         description: The team was successfully deleted
 *       404:
 *         description: Team not found
 */
router.route('/:id').get(getSingleTeam).patch(authenticateUser, authorizePermissions('manager'), updateTeam).delete(authenticateUser, authorizePermissions('manager'), deleteTeam);

module.exports = router;