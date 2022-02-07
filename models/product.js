const path = require('path');
const fs = require('fs');

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
  constructor(title, imageUrl, description, price) {
    this.productTitle = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductFromFile((product) => {
      product.push(this);
      fs.writeFile(filePath, JSON.stringify(product), (err) => {
        console.log('write error');
      });
    });
  }

  static fetchProducts(callback) {
    getProductFromFile(callback);
  }
};
