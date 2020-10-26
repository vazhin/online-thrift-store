const { body } = require('express-validator');

exports.validateUserData = [
  body('username')
    .not()
    .isEmpty()
    .withMessage('Must not be empty.')
    .isLength({ min: 4 })
    .withMessage('Must be at least 4 characters.'),
  body('email')
    .not()
    .isEmpty()
    .withMessage('Must not be empty.')
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be an email.'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Must not be empty.')
    .isLength({ min: 5 })
    .withMessage('Must be at least 5 characters.'),
];
