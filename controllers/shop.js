const Product = require('../models/product');

exports.getAllProductsData = (req, res, next) => {
  Product.fetchProducts((product) => {
    res.render('shop/product-list', {
      prods: product,
      pageTitle: 'All Product',
      path: '/products',
    });
  });
  // sendFile for rendering static html
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.getIndex = (req, res, next) => {
  Product.fetchProducts((product) => {
    res.render('shop/index', {
      prods: product,
      pageTitle: 'All Product',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
