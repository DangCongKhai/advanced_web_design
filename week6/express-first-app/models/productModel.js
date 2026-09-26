const products = [
  { id: 1, name: 'Laptop- vnuk', price: 1500, image: 'https://picsum.photos/seed/laptop/400/300' },
  { id: 2, name: 'Điện thoại', price: 800, image: 'https://picsum.photos/seed/phone/400/300' },
  { id: 3, name: 'Tai nghe', price: 100, image: 'https://picsum.photos/seed/headphones/400/300' }
];

exports.getAll = () => products;

exports.getById = (id) => products.find(p => p.id === id);


exports.add = (product) => {
  products.push(product);
};

exports.update = (id, product) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = product;
  }
};

