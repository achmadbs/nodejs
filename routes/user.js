const express = require('express');
const router = express.Router();

const productsContoller = require('../controllers/products');

router.get('/', productsContoller.getAllProductsData);

module.exports = router;
