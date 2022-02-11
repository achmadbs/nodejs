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

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findProductById(productId, (product) => {
    res.render('shop/product-detail', {
      product,
      pageTitle: 'Details Product',
      path: '/products',
    });
  });
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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(req.body);
  console.log(prodId);
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};
