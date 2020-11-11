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
  let limit = 6;
  let category = req.query.category;

  if (!page) page = 1;
  try {
    const products = await Product.findAll({
      offset: (page - 1) * limit,
      limit,
      ...(category && { where: { category } }),
    });
    const numOfProducts = await Product.count({
      ...(category && { where: { category } }),
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

exports.getByCategory = async (req, res, next) => {
  // try {
  //   const data = await Product.getByCategory(req.params.category);
  //   res.status(200).json(data);
  // } catch (err) {
  //   res.status(500).json({ err });
  // }
};
