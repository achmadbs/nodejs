const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();

const product = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/add-product' });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html')); <-- old way
});

router.post('/add-product', (req, res, next) => {
  product.push({ title: req.body.title });
  res.redirect('/');
});

module.exports = { router, product };
