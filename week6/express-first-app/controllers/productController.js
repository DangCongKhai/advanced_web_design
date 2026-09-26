const products = require('../models/productModel');


exports.getProducts = (req, res) => {
  res.render('products', { products: products.getAll() });
};


exports.getProductById = (req, res) => {
  const product = products.getById(parseInt(req.params.id));
  res.render('product', { product });
};


exports.addProduct = (req, res) => {
  
  const newProduct = {
    id: products.getAll().length + 1,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image
  };
  products.add(newProduct);
  res.redirect('/products');
};