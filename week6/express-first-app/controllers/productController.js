const products = [
  { id: 1, name: 'Laptop- vnuk', price: 1500 },
  { id: 2, name: 'Điện thoại', price: 800 },
  { id: 3, name: 'Tai nghe', price: 100 }
];


exports.getProducts = (req, res) => {
  res.render('products', { products });
};


exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
      res.send(`<h1>${product.name}</h1><p>Price: ${product.price}</p>`);
    } else {
      res.send("This product is not found!")
  }
};