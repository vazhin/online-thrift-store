const express = require('express');
const router = express.Router();

const Product = require('../data/products');

router.post('/', (req, res, next) => {
  Product.create(req.body);
  res.send('product created.'); // change this.
});

module.exports = router;
