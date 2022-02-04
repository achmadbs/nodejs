const product = [];

exports.getAddProductsPage = (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/add-product' });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); <-- old way
};

exports.postNewProduct = (req, res, next) => {
  product.push({ title: req.body.title });
  res.redirect('/');
};

exports.getAllProductsData = (req, res, next) => {
  res.render('shop', { prods: product, pageTitle: 'Shop', path: '/' });

  // sendFile for rendering static html
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};
