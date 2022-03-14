const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProductsPage);

router.post('/add-product', adminController.postNewProduct);

// router.get('/products', adminController.getProducts);

// router.get('/edit-product/:productId', adminController.getEditProductsPage);

// router.post('/edit-product', adminController.updatedProduct);

// router.post('/delete-product', adminController.deleteProduct);

module.exports = router;
