const Product = require('../data/Product');
const { validationResult } = require('express-validator');

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = await Product.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getRecentProducts = async (req, res, next) => {
  try {
    const data = await Product.getRecent();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getAProduct = async (req, res, next) => {
  try {
    const data = await Product.getOne(req.params.productId);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ err });
  }
};

exports.getByCategory = async (req, res, next) => {
  try {
    const data = await Product.getByCategory(req.params.category);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
};
