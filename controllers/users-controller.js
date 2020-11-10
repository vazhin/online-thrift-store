const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { User, Product } = require('../models');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  image = 'uploads/users/no-profile-image.png';

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err.message);
    }

    try {
      const user = await User.create({
        username,
        email,
        password: hash,
        image,
      });
      res.redirect('/login');
    } catch (err) {
      console.log(err);
    }
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { userId: req.params.userId },
      attributes: ['username', 'email', 'image', 'userId', 'id'],
    });
    const products = await Product.findAll({
      where: { userId: user.id },
    });
    res.render('user-account', {
      user: user,
      currentUser: req.user,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};
