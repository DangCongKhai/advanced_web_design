const express = require('express');
const router = express.Router(); // Create a new router instance
const squareController = require('../controllers/squareController');

// Matches: GET /products/
router.get('/', squareController.showForm);
router.post('/', squareController.calculateSquare);

module.exports = router;