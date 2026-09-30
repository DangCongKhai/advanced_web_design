const { getProductById } = require("../../express-first-app/controllers/productController");
const db = require("../config/database");

const Product = {
  getAllProducts: async () => {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  },

  
  createProduct: async (productData) => {
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [productData.name, productData.description, productData.price, productData.image],
    );
    return result;
  },

  getProductById: async (id) => {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  },

  updateProduct: async (id, productData) => {
    const [result] = await db.query("UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?", [productData.name, productData.description, productData.price, productData.image, id]);
    return result;
  },

  deleteProduct: async (id) => {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    return result;
  },

};


module.exports = Product;
