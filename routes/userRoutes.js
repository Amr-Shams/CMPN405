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

router
  .route('/')
  .get(authorizePermissions('admin'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
router.route('/:id').get(authenticateUser, getSingleUser);
router.route('/reserveSeat/:matchId').patch(authenticateUser, reserveSeat);
router.route('/cancelReservation').patch(authenticateUser, cancelReservation);
router.route('/getReservation').get(authenticateUser, getReservation);

module.exports = router;
