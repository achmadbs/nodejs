const express = require('express');
const path = require('path');
const rootDir = require('../utils/path');
const router = express.Router();

const adminData = require('../routes/admin');

router.get('/', (req, res, next) => {
  const product = adminData.product;
  // render template engine (no need to add extension since we already telling express to use pug)

  res.render('shop', { prods: product, pageTitle: 'Shop', path: '/' });

  // sendFile for rendering static html
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
