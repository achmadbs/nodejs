const express = require('express');
const router = express.Router();

const shopContoller = require('../controllers/shop');

router.get('/', shopContoller.getIndex);

router.get('/products', shopContoller.getAllProductsData);

router.get('/cart', shopContoller.getCart);

router.get('/checkout', shopContoller.getCheckout);

module.exports = router;
