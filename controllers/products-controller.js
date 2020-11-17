const fs = require('fs');
const { Op } = require('sequelize');
const { Product, User, sequelize } = require('../models');

exports.createProduct = async (req, res, next) => {
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
  const image = req.file ? req.file.path : '';
  const userId = req.user.id;

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

    res.redirect(`/products/${product.productId}`);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  let page = req.query.page;
  if (!page) page = 1;
  const limit = 6;
  let category = req.query.category;
  let condition = req.query.condition;
  let query = req.query.q;

  const queryArr = [];

  if (query)
    queryArr.push({
      [Op.or]: [
        { name: { [Op.substring]: query.trim() } },
        { city: { [Op.substring]: query.trim() } },
        { description: { [Op.substring]: query.trim() } },
      ],
    });
  if (category) queryArr.push({ category });
  if (condition) {
    queryArr.push(
      Array.isArray(condition)
        ? {
            condition: {
              [Op.or]: [...condition],
            },
          }
        : {
            condition,
          }
    );
  }

  try {
    const result = await Product.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      order: [['createdAt', 'DESC']],
      where: {
        [Op.and]: queryArr,
      },
    });

    const products = result.rows;
    const numOfProducts = result.count;
    const numOfPages = Math.ceil(numOfProducts / limit);

    const categoryCounts = await Product.findAll({
      group: 'category',
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('category')), 'count'],
      ],
    });

    const count = {};
    for (let elem of categoryCounts) {
      count[elem.category] = elem.get('count');
    }

    res.locals = {
      ...res.locals,
      products,
      numOfPages,
      numOfProducts,
      count,
    };
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.getAProduct = async (req, res, next) => {
  try {
    let product = await Product.findOne({
      where: { productId: req.params.productId },
      include: [
        {
          model: User,
          attributes: ['username', ['image', 'userImage'], 'userId'],
          as: 'user',
        },
      ],
    });
    product = product.toJSON();
    res.render('product-detail', { product, user: req.user });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findOne({
      where: { productId },
    });

    fs.unlink(product.image, (err) => {
      if (err) console.log(err);
      console.log(`${product.image} was deleted`);
    });

    product.destroy();
    res.status(200).json({ message: 'Product deleted!' });
  } catch (err) {
    console.log(err);
  }
};

exports.editProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const {
    name,
    price,
    currency,
    description,
    city,
    phoneNumber,
    category,
    condition,
  } = req.body;
  try {
    const product = await Product.findOne({
      where: { productId },
    });

    product.name = name;
    product.price = price;
    product.currency = currency;
    product.description = description;
    product.city = city;
    product.phoneNumber = phoneNumber;
    product.category = category;
    product.condition = condition;

    await product.save();

    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
  }
};

exports.editImage = async (req, res, next) => {
  const productId = req.params.productId;
  const path = req.file ? req.file.path : '';

  try {
    const product = await Product.findOne({
      where: { productId },
    });

    const oldImage = product.image;
    product.image = path;

    await product.save();

    fs.unlink(oldImage, (err) => {
      if (err) console.log(err);
      console.log(`${oldImage} was deleted`);

      res.status(200).json({ product });
    });
  } catch (err) {
    console.log(err);
  }
};
