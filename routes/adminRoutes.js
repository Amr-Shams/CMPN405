const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    authorizePermissions,
  } = require('../middleware/authentication');

const {
    getallPendingUsers,
    approveUser,
    deleteUser,
    deleteAllUsers
} = require('../controllers/adminController');
/**
 * @swagger
 * /api/v1/admin:
 *   get:
 *     summary: Get all pending users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of all pending users
 */
router
    .route('/')
    .get(authenticateUser,authorizePermissions('admin'), getallPendingUsers);

/**
 * @swagger
 * /api/v1/admin/approveUser/{id}:
 *   patch:
 *     summary: Approve a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was successfully approved
 *       404:
 *         description: User not found
 */
router.route('/approveUser/:id').patch(authenticateUser,authorizePermissions('admin'), approveUser);
/**
 * @swagger
 * /api/v1/admin/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       404:
 *         description: User not found
 */
router.route('/deleteUser/:id').delete(authenticateUser,authorizePermissions('admin'), deleteUser);
/**
 * @swagger
 * /api/v1/admin/deleteAllUsers:
 *   delete:
 *     summary: Delete all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users were successfully deleted
 */
router.route('/deleteAllUsers').delete(authenticateUser,authorizePermissions('admin'), deleteAllUsers);

module.exports = router;

