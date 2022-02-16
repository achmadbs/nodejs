const Product = require('../models/product');

exports.getAddProductsPage = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    isEditing: false,
  });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); <-- old way
};

exports.postNewProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  product
    .save()
    .then(() => res.redirect('/'))
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProductsPage = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');
  const prodId = req.params.productId;
  Product.findProductById(prodId, (product) => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      isEditing: editMode,
      product: product,
    });
  });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); <-- old way
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

exports.updatedProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    price,
    description
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteProduct(req.body.productId);
  res.redirect('/admin/products');
};
