var express = require('express');
var router = express.Router();

const { signup, login, getUser } = require('../controllers/users-controller');

const {
  validateUserData,
} = require('../controllers/validators/user-validator');

router.post('/login', login);
router.post('/signup', validateUserData, signup);
router.get('/:userId', getUser);

module.exports = router;
