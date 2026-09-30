// routes/productRoutes.js  																					
const express = require('express');  																					
const router = express.Router();  																					
const productController = require('../controllers/productController');  																					
																					
// Routes cho sản phẩm  																					
router.get('/', productController.getAllProducts);  																					
router.get('/new', (req, res) => res.render('products/new'));  																					
router.get('/:id/edit', productController.getProductById);  																					
router.post('/', productController.createProduct);router.put('/:id', productController.updateProduct);  																					
router.delete('/:id', productController.deleteProduct);  																					
																					
module.exports = router; 