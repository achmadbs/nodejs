const Product = require('../models/product');

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
  let newQuantity = 1;
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
      if (product) {
        const oldQty = product.cartItem.quantity;
        newQuantity = oldQty + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

exports.postCartDelete = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const cartList = await req.user.getCart();
    const productData = await cartList.getProducts({ where: { id: prodId } });
    await productData[0].cartItem.destroy();
    res.redirect('/cart');
  } catch (error) {
    console.trace(error);
  }
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
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

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err));
};
