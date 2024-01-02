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

router.route('/').get(getAllTeams).post(authenticateUser, authorizePermissions('manager'), createTeam);
router.route('/:id').get(getSingleTeam).patch(authenticateUser, authorizePermissions('manager'), updateTeam).delete(authenticateUser, authorizePermissions('manager'), deleteTeam);

module.exports = router;