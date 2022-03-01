const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProductsData = (req, res, next) => {
  Product.findAll()
    .then((response) => {
      res.render('shop/product-list', {
        prods: response,
        pageTitle: 'All Product',
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // sendFile for rendering static html
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((response) => {
      res.render('shop/product-detail', {
        product: response,
        pageTitle: 'Details Product',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((response) => {
      res.render('shop/index', {
        prods: response,
        pageTitle: 'All Product',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart',
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({
        where: {
          id: prodId,
        },
      });
    })
    .then((productCart) => {
      let product;
      if (productCart.length > 0) {
        product = productCart[0];
      }
      let newQuantity = 1;
      if (productCart) {
        //...
      }
      return Product.findByPk(prodId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findProductById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
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

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart',
            cartItems: products,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
