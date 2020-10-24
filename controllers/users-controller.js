const User = require('../data/users');

exports.login = (req, res, next) => {};

exports.signup = (req, res, next) => {
  User.signup(req.body, ({ err, data }) => {
    if (err) {
      // TODO: change the status code.
      res.status(500).json({ message: err });
    }
    res.status(200).json(data);
  });
};

exports.getUser = (req, res, next) => {};
