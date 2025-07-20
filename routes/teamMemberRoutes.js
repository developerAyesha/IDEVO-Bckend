const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController');

router.get('/', teamMemberController.getAllTeamMembers);
router.post('/', teamMemberController.createTeamMember);
// Add more routes as needed

module.exports = router; 