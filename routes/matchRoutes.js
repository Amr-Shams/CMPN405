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

router
    .route('/')
    .get(getAllMatches)
    .post(authenticateUser, authorizePermissions('manager'), createMatch);

router
    .route('/:id')
    .get(getSingleMatch)
    .patch(authenticateUser, authorizePermissions('manager'), updateMatch)
    .delete(authenticateUser, authorizePermissions('manager'), deleteMatch);

module.exports = router;