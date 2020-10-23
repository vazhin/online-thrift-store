const Product = require('../data/products');

exports.createProduct = (req, res, next) => {
  Product.create(req.body, ({ err, row }) => {
    if (err) {
      console.error(err);
    }
    console.log(row);
  });

  res.status(201).send('product created.');
};

exports.getProducts = (req, res, next) => {
  // Product.
};
