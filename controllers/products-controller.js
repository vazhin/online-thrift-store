const Product = require('../data/products');
const { validationResult } = require('express-validator');

exports.createProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Product.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ err }));
};

exports.getRecentProducts = (req, res, next) => {
  Product.getRecent(({ err, data }) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json(data);
  });
};

exports.getAProduct = (req, res, next) => {
  Product.getOne(req.params.productId, ({ err, row }) => {
    if (err) {
      res.status(404).json({ message: err });
    }
    res.status(200).json(row);
  });
};

exports.getByCategory = (req, res, next) => {
  Product.getByCategory(req.params.category, ({ err, data }) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json(data);
  });
};
