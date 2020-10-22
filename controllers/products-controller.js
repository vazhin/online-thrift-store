const Product = require('../data/products');

exports.createProduct = (req, res, next) => {
  Product.create(req.body);

  res.status(201).send('product created.');
};
