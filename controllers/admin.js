const Product = require('../models/product');

exports.getAddProductsPage = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); <-- old way
};

exports.postNewProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchProducts((product) => {
    res.render('admin/products', {
      prods: product,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};
