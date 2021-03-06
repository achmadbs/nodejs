const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  productTitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);

// const { getDb } = require('../utils/database');
// const ObjectID = require('bson-objectid');

// class Product {
//   constructor(productTitle, price, image, description, id, userId) {
//     this.productTitle = productTitle;
//     this.price = price;
//     this.image = image;
//     this.description = description;
//     this._id = id ? ObjectID(id) : null;
//     this.userId = userId;
//   }

//   async save() {
//     const db = getDb();
//     let dbOpt;
//     if (this._id) {
//       // update
//       dbOpt = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       // save
//       dbOpt = db.collection('products').insertOne(this);
//     }
//     try {
//       const res = await dbOpt;
//       return res;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async fetchAll() {
//     const db = getDb();
//     try {
//       const res = await db.collection('products').find().toArray();
//       return res;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async findProductById(productId) {
//     const db = getDb();
//     try {
//       const res = await db
//         .collection('products')
//         .find({ _id: ObjectID(productId) })
//         .next();
//       return res;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async deleteProductById(productId) {
//     const db = getDb();
//     try {
//       const res = await db
//         .collection('products')
//         .deleteOne({ _id: ObjectID(productId) });
//       return res;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// module.exports = Product;
