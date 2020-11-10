var express = require('express');
var router = express.Router();

const { isAuthenticated } = require('../middlewares/auth');
const { getAllProducts } = require('../controllers/products-controller');

router.get('/', getAllProducts, function (req, res, next) {
  res.render('index', {
    products: res.locals.products,
    numOfPages: res.locals.numOfPages,
    numOfProducts: res.locals.numOfProducts,
    user: req.user,
  });
});

router.get('/login', (req, res) => {
  res.render('login-signup-form', { form: 'Login', action: '/users/login' });
});

router.get('/signup', (req, res) => {
  res.render('login-signup-form', { form: 'Sign Up', action: '/users/signup' });
});

router.get('/login', (req, res) => {
  res.render('login-signup-form', { form: 'Login', action: '/users/login' });
});

router.get('/product/', isAuthenticated, (req, res, next) => {
  res.render('create-product-form', { user: req.user });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});

module.exports = router;
