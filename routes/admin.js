const express = require('express');
const router = express.Router();

const productsContoller = require('../controllers/products');

router.get('/add-product', productsContoller.getAddProductsPage);

router.post('/add-product', productsContoller.postNewProduct);

module.exports = router;
