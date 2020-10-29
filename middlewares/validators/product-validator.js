const { body } = require('express-validator');

exports.validateData = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Must not be empty.')
    .exists()
    .withMessage('Must have a name field.'),
  body('user_id')
    .not()
    .isEmpty()
    .withMessage('Must not be empty.')
    .toInt()
    .isInt()
    .withMessage('Not a number.'),
  body('price').toInt().isInt().withMessage('Not a number.'),
  body('owner_phoneNumber')
    .isMobilePhone()
    .withMessage('Must be a phone number.'),
  body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Must not be empty.')
    .isLength({ min: 10 })
    .withMessage('Must be at least 10 characters.'),
  body('condition')
    .isIn(['new with tags', 'like-new', 'gently-used', 'signs of use'])
    .withMessage(
      'Must be any of these conditions (new with tags, like-new, gently-used, signs of wear)'
    ),
  body('date_added').isISO8601().withMessage('Must be a date.'),
  body('category')
    .isIn(['clothes', 'furniture', 'computer', 'mobile device'])
    .withMessage(
      `Must be any of these categories (clothes, furniture, computer, mobile device)`
    ),
];
