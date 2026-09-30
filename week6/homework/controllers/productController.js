const Product = require('../models/productModel');  																					
																					
const productController = {  	
  getProducts: async (req, res) => { 
    
    try {
      const products = await Product.getAllProducts();
      return res.render('products', { products });
    } catch (error) {
       return res.status(500).json({ error: 'Database query error' });  																					
    } 																					
  },  																					
  showAddProductForm: (req, res) => {  																					
    return res.render('formProduct', { product: {} });  																					
  },  																					
  addProduct: async (req, res) => {  																					
    const productData = req.body;  																					
    try {
      await Product.createProduct(productData); 																				
      return res.redirect('/api/products');  																					

    } catch (error) {
      return res.status(500).json({ error: 'Failed to add product' });  																					
    }																		
  },
  
  showEditProductForm: async (req, res) => {
    const product = await Product.getProductById(req.params.id);
    return res.render('formProduct', { product });
  },
  updateProduct: async (req, res) => {
    const productData = req.body;
    await Product.updateProduct(req.params.id, productData);
    return res.redirect('/api/products');
  },
  deleteProduct: async (req, res) => {
    await Product.deleteProduct(req.params.id);
    return res.redirect('/api/products');
  }
};  																					
																																									
module.exports = productController;