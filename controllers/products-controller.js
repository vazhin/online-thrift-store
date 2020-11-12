const { Op } = require('sequelize');
const { Product, User } = require('../models');

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

    res.redirect('/');
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
  let location = req.query.location;

  const queryArr = [];

  if (query) queryArr.push({ name: { [Op.substring]: query.trim() } });
  if (location) queryArr.push({ city: { [Op.substring]: location.trim() } });
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
    const products = await Product.findAll({
      offset: (page - 1) * limit,
      limit,
      order: [['createdAt', 'DESC']],
      where: {
        [Op.and]: queryArr,
      },
    });
    const numOfProducts = await Product.count({
      where: {
        [Op.and]: queryArr,
      },
    });
    const numOfPages = Math.ceil(numOfProducts / limit);

    const clothes = await Product.count({
      where: { category: 'clothes' },
    });
    const computers = await Product.count({
      where: { category: 'computer' },
    });
    const furniture = await Product.count({
      where: { category: 'furniture' },
    });
    const phones = await Product.count({
      where: { category: 'mobile device' },
    });

    const count = {
      clothes,
      computers,
      furniture,
      phones,
    };

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
