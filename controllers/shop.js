const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProductsData = (req, res, next) => {
  Product.fetchProducts()
    .then(([items]) => {
      res.render('shop/product-list', {
        prods: items,
        pageTitle: 'All Product',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
  // sendFile for rendering static html
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findProductById(productId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: 'Details Product',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchProducts()
    .then(([items]) => {
      res.render('shop/index', {
        prods: items,
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
  Product.findProductById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
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
  Cart.getCart((cart) => {
    Product.fetchProducts((product) => {
      const itemList = [];
      for (let items of product) {
        const cartProduct = cart.products.find((prod) => prod.id === items.id);
        if (cartProduct) {
          itemList.push({ productData: items, qty: cartProduct.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cartItems: itemList,
      });
    });
  });
};
