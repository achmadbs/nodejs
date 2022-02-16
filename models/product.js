const db = require('../utils/database');
const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.productTitle = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.execute(
      'INSERT INTO products (productTitle, price, description, imageUrl) VALUES (?, ?, ?, ?)',
      [this.productTitle, this.price, this.description, this.imageUrl]
    );
  }

  static fetchProducts() {
    return db.execute('SELECT * FROM products');
  }

  static findProductById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

  static deleteProduct(id) {}
};
