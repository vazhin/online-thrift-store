const { validationResult } = require('express-validator');

const User = require('../data/User');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.signup(req.body);
    console.log(user);
    res.redirect('/login');
  } catch (err) {
    res.status(500).json({ err });
  }
};
