var express = require('express');
var router = express.Router();
const passport = require('passport');

const { signup, getUser } = require('../controllers/users-controller');

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/',
  })
);

router.post('/signup', signup);

router.get('/:userId', getUser);

module.exports = router;
