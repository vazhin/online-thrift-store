const { Product } = require('../models');
const { validationResult } = require('express-validator');

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return;
  }

  const {
    name,
    price,
    currency,
    description,
    condition,
    category,
    city,
    phoneNumber,
  } = req.body;
  const image = req.file.path;
  const userId = req.user.userId;

  try {
    const product = await Product.create({
      name,
      price,
      currency,
      description,
      condition,
      category,
      city,
      phoneNumber,
      image,
      userId,
    });

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  let page = req.query.page;
  if (!page) page = 1;
  try {
    const products = await Product.findAll({
      offset: (page - 1) * 6,
      limit: 6,
    });
    const numOfProducts = await Product.count();
    const numOfPages = Math.ceil(numOfProducts / 6);

    res.locals = { ...res.locals, products, numOfPages, numOfProducts };
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.getAProduct = async (req, res, next) => {
  // try {
  //   const data = await Product.getOne(req.params.productId);
  //   res.render('product-detail', { product: data, user: req.user });
  // } catch (err) {
  //   res.status(404).json({ err }); // what to return?
  // }
};

exports.getByCategory = async (req, res, next) => {
  // try {
  //   const data = await Product.getByCategory(req.params.category);
  //   res.status(200).json(data);
  // } catch (err) {
  //   res.status(500).json({ err });
  // }
};
