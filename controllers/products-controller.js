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
  // try {
  //   const data = await Product.getAll(req.query.page);
  //   const numOfPages = await Product.getNumOfPages();
  //   res.locals.data = data;
  //   res.locals.numOfPages = numOfPages;
  //   next();
  // } catch (err) {
  //   res.status(500).json({ err });
  //   // TODO: fix this.
  // }
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
