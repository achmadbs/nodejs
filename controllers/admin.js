const Product = require('../models/product');
const ObjectID = require('bson-objectid');

exports.getAddProductsPage = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    isEditing: false,
  });
};

exports.postNewProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    productTitle: title,
    price,
    description,
    imageUrl,
    userId: req.user._id,
  });
  product
    .save()
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProductsPage = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        isEditing: editMode,
        product: product,
      });
    })
    .catch((error) => console.log(error));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((product) => {
      res.render('admin/products', {
        prods: product,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((error) => console.log(error));
};

exports.updateProduct = async (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  try {
    const response = await Product.findOneAndUpdate(
      { _id: ObjectID(productId) },
      {
        productTitle: title,
        price,
        description,
        imageUrl,
      },
      { new: true }
    );
    res.redirect('/admin/products');
    return response;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const response = await Product.findByIdAndDelete(req.body.productId);
    return response;
  } catch (error) {
    console.log(error);
  }
};
