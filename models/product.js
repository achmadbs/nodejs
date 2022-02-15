const path = require('path');
const fs = require('fs');
const Cart = require('./cart');

const filePath = path.join(
  path.dirname(require.main.filename),
  'data',
  'product.json'
);

const getProductFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.productTitle = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductFromFile((product) => {
      if (this.id) {
        const existingProductIndex = product.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProduct = [...product];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
          console.log('write error');
        });
      } else {
        this.id = Math.random().toString();
        product.push(this);
        fs.writeFile(filePath, JSON.stringify(product), (err) => {
          console.log('write error');
        });
      }
    });
  }

  static fetchProducts(callback) {
    getProductFromFile(callback);
  }

  static findProductById(id, callback) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static deleteProduct(id) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
