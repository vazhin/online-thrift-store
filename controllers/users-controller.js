const { validationResult } = require('express-validator');

const User = require('../data/users');

exports.login = (req, res, next) => {
  User.login(req.body, ({ err, user }) => {
    // TODO: change these.
    if (err) {
      res.status(403).json(err);
    }
    res.status(200).json(user);
  });
};

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.signup(req.body, (err, user) => {
    if (err) {
      return res.status(500).json({ err });
    }

    console.log(user);
    res.redirect('/login');
  });
};

exports.getUser = (req, res, next) => {};
