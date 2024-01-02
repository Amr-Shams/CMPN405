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

router
    .route('/')
    .get(authenticateUser,authorizePermissions('admin'), getallPendingUsers);

router.route('/approveUser/:id').patch(authenticateUser,authorizePermissions('admin'), approveUser);
router.route('/deleteUser/:id').delete(authenticateUser,authorizePermissions('admin'), deleteUser);
router.route('/deleteAllUsers').delete(authenticateUser,authorizePermissions('admin'), deleteAllUsers);

module.exports = router;

