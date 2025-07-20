const express = require('express');
const router = express.Router();
const kanbanController = require('../controllers/kanbanController');

router.get('/', kanbanController.getAllColumns);
router.post('/', kanbanController.createColumn);
// Add more routes as needed

module.exports = router; 