const express = require('express');  																					
const router = express.Router();  																					
const productController = require('../controllers/productController');  																					
																					
// Route để hiển thị danh sách sản phẩm  																					
router.get('/products', productController.getProducts);  																					
																					
// Routes để thêm sản phẩm  																					
router.get('/products/add', productController.showAddProductForm);  																					
router.post('/products', productController.addProduct);  																					
																					
// Routes để chỉnh sửa sản phẩm  																					
router.get('/products/edit/:id', productController.showEditProductForm);  																					
router.post('/products/edit/:id', productController.updateProduct);  																					
																					
// Route để xóa sản phẩm  																					
router.post('/products/delete/:id', productController.deleteProduct);  																					
																					
module.exports = router;  