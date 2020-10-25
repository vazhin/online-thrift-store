const User = require('../data/users');

exports.login = (req, res, next) => {
  User.login(req.body, ({ err, data }) => {
    // TODO: change these.
    if (err) {
      res.status(403).json(err);
    }
    res.status(200).json(data);
  });
};

exports.signup = (req, res, next) => {
  User.signup(req.body, ({ err, data }) => {
    if (err) {
      // TODO: change the status code maybe.
      res.status(500).json({ message: err });
    }
    res.status(200).json(data);
  });
};

exports.getUser = (req, res, next) => {};
