const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  reserveSeat,
  cancelReservation,
  getReservation
} = require('../controllers/userController');
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns a list of all users
 */
router
  .route('/')
  .get(authorizePermissions('admin'), getAllUsers);


/**
 * @swagger
 * /api/v1/user/showMe:
 *   get:
 *     summary: Get the current user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns the current user
 */
router.route('/showMe').get(authenticateUser, showCurrentUser);
/**
 * @swagger
 * /api/v1/user/updateUser:
 *   put:
 *     summary: Update the current user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *       400:
 *         description: Invalid email or name
 */
router.route('/updateUser').patch(authenticateUser, updateUser);
/**
 * @swagger
 * /api/v1/user/updateUserPassword:
 *   put:
 *     summary: Update the current user's password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: The password was successfully updated
 *       400:
 *         description: Invalid old password or new password
 */
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get a single user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Returns the user
 *       404:
 *         description: User not found
 */
router.route('/:id').get(authenticateUser, getSingleUser);
/**
 * @swagger
 * /api/v1/user/reserSeat/{matchId}:
 *   post:
 *     summary: Reserve a seat for the current user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matchId:
 *                 type: string
 *               seat:
 *                 type: string
 *     responses:
 *       200:
 *         description: The seat was successfully reserved
 *       400:
 *         description: Invalid match ID or seat
 */
router.route('/reserveSeat/:matchId').patch(authenticateUser, reserveSeat);
/**
 * @swagger
 * /api/v1/user/cancelReservation:
 *   patch:
 *     summary: Cancel the current user's reservation
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The reservation was successfully canceled
 */

router.route('/cancelReservation').patch(authenticateUser, cancelReservation);
/**
 * @swagger
 * /api/v1/user/reservation:
 *   get:
 *     summary: Get the current user's reservation
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns the current user's reservation
 *       404:
 *         description: Reservation not found
 */
router.route('/reservation').get(authenticateUser, getReservation);

module.exports = router;
