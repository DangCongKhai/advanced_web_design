CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  old_price DECIMAL(10,2) NULL,
  is_sale TINYINT(1) NOT NULL DEFAULT 0,
  detail_url VARCHAR(255) NOT NULL DEFAULT 'product.html',
  product_type ENUM('new', 'top') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products
  (name, image_url, price, old_price, is_sale, detail_url, product_type)
VALUES
  ('Banh Sachertorte', 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800', 220000, 250000, 1, 'product.html', 'new'),
  ('Banh Cupcake - Anh Quoc', 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800', 120000, 150000, 1, 'product.html', 'new'),
  ('Banh Tao - My', 'https://images.pexels.com/photos/1111318/pexels-photo-1111318.jpeg?auto=compress&cs=tinysrgb&w=800', 200000, NULL, 0, 'product.html', 'new'),
  ('Banh Tiramisu - Italia', 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800', 200000, NULL, 0, 'product.html', 'new'),
  ('Banh Crepe Sau Rieng', 'https://images.pexels.com/photos/1998635/pexels-photo-1998635.jpeg?auto=compress&cs=tinysrgb&w=800', 180000, NULL, 0, 'product.html', 'top'),
  ('Banh Crepe Chocolate', 'https://images.pexels.com/photos/4686824/pexels-photo-4686824.jpeg?auto=compress&cs=tinysrgb&w=800', 150000, 180000, 1, 'product.html', 'top'),
  ('Banh Crepe Sau Rieng - Chuoi', 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=800', 190000, 220000, 1, 'product.html', 'top'),
  ('Banh Crepe Phap', 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800', 170000, 200000, 1, 'product.html', 'top');
