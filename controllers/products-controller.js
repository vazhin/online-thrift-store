const Product = require('../data/products');

exports.createProduct = (req, res, next) => {
  Product.create(req.body, ({ err, row }) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    res.status(201).send(row);
  });
};

exports.getProducts = (req, res, next) => {
  Product.getAll(({ err, data }) => {
    if (err) {
      res.status(500).send({ message: err });
    }
    res.status(200).send(data);
  });
};
