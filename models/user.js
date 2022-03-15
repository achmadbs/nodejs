const { getDb } = require('../utils/database');
const ObjectID = require('bson-objectid');

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
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

  static async findById(userId) {
    const db = getDb();
    try {
      const user = await db.collection('users').find({ _id: ObjectID(userId) });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
