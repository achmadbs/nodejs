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

  save() {}

  static fetchProducts() {
    return db.execute('SELECT * FROM products');
  }

  static findProductById(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static deleteProduct(id) {}
};
