const Product = require('../models/product');

exports.getAllProductsData = (req, res, next) => {
  Product.find()
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
  Product.findById(productId)
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
  Product.find()
    .then((response) => {
      res.render('shop/index', {
        prods: response,
        pageTitle: 'All Product',
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findById(prodId);
    await req.user.addToCart(product);
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

exports.postCartDelete = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    await req.user.deleteCart(prodId);
    res.redirect('/cart');
  } catch (error) {
    console.trace(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const usersOrder = await req.user.getOrders();
    res.render('shop/orders', {
      pageTitle: 'Orders',
      path: '/orders',
      orders: usersOrder,
    });
  } catch (error) {
    console.log(error);
  }
  // req.user
  //   .getOrders({ include: ['products'] })
  //   .then((orders) => {
  //     res.render('shop/orders', {
  //       pageTitle: 'Orders',
  //       path: '/orders',
  //       orders: orders,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getCart = async (req, res, next) => {
  try {
    const result = await req.user.populate('cart.items.productId');
    console.log(result.cart.items);
    res.render('shop/cart', {
      pageTitle: 'Cart',
      path: '/cart',
      cartItems: result.cart.items,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    await req.user.addOrder();
    res.redirect('/orders');
  } catch (error) {
    console.log(error);
  }
};
