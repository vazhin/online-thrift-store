var express = require('express');
var router = express.Router();
const passport = require('passport');

const { signup, getUser } = require('../controllers/users-controller');

const {
  validateUserData,
} = require('../middlewares/validators/user-validator');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/',
  })
);

router.post('/signup', validateUserData, signup);

router.get('/:userId', getUser);

module.exports = router;
