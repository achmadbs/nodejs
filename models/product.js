const { getDb } = require('../utils/database');
const ObjectID = require('bson-objectid');
const mongo = require('mongodb');

class Product {
  constructor(productTitle, price, image, description) {
    this.productTitle = productTitle;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  async save() {
    const db = getDb();
    try {
      const res = await db.collection('products').insertOne(this);
      console.log('db', res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchAll() {
    const db = getDb();
    try {
      const res = await db.collection('products').find().toArray();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  static async findProductById(productId) {
    const db = getDb();
    try {
      const res = await db
        .collection('products')
        .find({ _id: ObjectID(`${productId}`) })
        .next();
      console.log('res product by id', res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Product;
