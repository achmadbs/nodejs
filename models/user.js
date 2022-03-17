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
    let newQuantity = 1;
    const currentCart = [...this.cart.items];
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => String(cp.productId) === String(product._id)
    );
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      currentCart[cartProductIndex].quantity = newQuantity;
    } else {
      currentCart.push({
        productId: ObjectID(product._id),
        quantity: newQuantity,
      });
    }
    try {
      const updatedCart = {
        items: currentCart,
      };
      const result = await db
        .collection('users')
        .updateOne(
          { _id: ObjectID(this._id) },
          { $set: { cart: updatedCart } }
        );
      return result;
    } catch (error) {
      console.log(error);
    }
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
