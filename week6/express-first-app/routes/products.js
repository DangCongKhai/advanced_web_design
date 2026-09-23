const express = require('express');
const router = express.Router(); // Create a new router instance
const productController = require('../controllers/productController');

// Matches: GET /products/
router.get('/', productController.getProducts);


router.get("/:id", productController.getProductById);


module.exports = router;