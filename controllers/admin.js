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
  Product.create({
    productTitle: title,
    imageUrl,
    price,
    description,
    userId: req.user,
  })
    .then((response) => {
      console.log(response);
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProductsPage = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        isEditing: editMode,
        product: product,
      });
    })
    .catch((error) => console.log(error));
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); <-- old way
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render('admin/products', {
        prods: product,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((error) => console.log(error));
};

exports.updatedProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.update(
    { productTitle: title, imageUrl, price, description },
    { where: { id: productId } }
  ).then(() => {
    res.redirect('/admin/products');
  });
};

exports.deleteProduct = (req, res, next) => {
  Product.destroy({ where: { id: req.body.productId } }).then(() => {
    res.redirect('/admin/products');
  });
};
