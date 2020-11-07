const Product = require('../data/Product');
const { validationResult } = require('express-validator');

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  req.body.image = req.file.path;

  try {
    const data = await Product.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const data = await Product.getAll(req.query.page);
    res.locals.data = data;
    next();
  } catch (err) {
    res.status(500).json({ err });
    // TODO: fix this.
  }
};

exports.getAProduct = async (req, res, next) => {
  try {
    const data = await Product.getOne(req.params.productId);
    res.render('product-detail', { product: data, user: req.user });
  } catch (err) {
    res.status(404).json({ err }); // what to return?
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
