const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProductsPage);

router.post('/add-product', adminController.postNewProduct);

router.get('/products', adminController.getProducts);

module.exports = router;
