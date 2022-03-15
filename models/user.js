const { getDb } = require('../utils/database');
const ObjectID = require('bson-objectid');

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  async save() {
    const db = getDb();
    try {
      const result = await db.collection('users').insertOne(this);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart(product) {
    const db = getDb();
    try {
      const updatedCart = { items: [{ ...product, quantity: 1 }] };
      const result = await db
        .collection('users')
        .updateOne(
          { _id: ObjectID(this._id) },
          { $set: { cart: updatedCart } }
        );
      return result;
    } catch (error) {}
  }

  static async findById(userId) {
    const db = getDb();
    try {
      const user = await db
        .collection('users')
        .findOne({ _id: ObjectID(userId) });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
