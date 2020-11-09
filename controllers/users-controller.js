const { validationResult } = require('express-validator');

const { User } = require('../models');
const Product = require('../data/Product');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  image = 'uploads/users/no-profile-image.png';

  try {
    const user = await User.create({ username, email, password, image });
    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.get(req.params.userId);
    const products = await Product.getByUser(req.params.userId);
    res.render('user-account', {
      user: user,
      currentUser: req.user,
      products: products,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
