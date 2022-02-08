const express = require('express');
const router = express.Router();

const shopContoller = require('../controllers/shop');

router.get('/', shopContoller.getIndex);

router.get('/products', shopContoller.getAllProductsData);

router.get('/products/:productId', shopContoller.getProductById);

router.get('/cart', shopContoller.getCart);

router.get('/orders', shopContoller.getOrders);

router.get('/checkout', shopContoller.getCheckout);

module.exports = router;
