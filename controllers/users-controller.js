const { validationResult } = require('express-validator');

const User = require('../data/User');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  req.body.image = 'uploads/users/no-profile-image.png';

  try {
    const user = await User.signup(req.body);
    res.redirect('/login');
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.get(req.params.userId);
    res.render('user-account', { user: user, currentUser: req.user });
  } catch (err) {
    res.status(500).json({ err });
  }
};
