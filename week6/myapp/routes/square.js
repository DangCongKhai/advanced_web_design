const express = require('express');
const router = express.Router(); // Create a new router instance
const squareController = require('../controllers/squareController');

// Matches: GET /
router.get('/', squareController.getUsers);
router.post('/', squareController.calculateSquare);

module.exports = router;