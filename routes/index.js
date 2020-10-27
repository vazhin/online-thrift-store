var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login-signup-form', { form: 'Login', action: '/users/login' });
});

router.get('/signup', (req, res) => {
  res.render('login-signup-form', { form: 'Sign Up', action: '/users/signup' });
});

module.exports = router;
