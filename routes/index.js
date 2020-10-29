var express = require('express');
var router = express.Router();

const { isAuthenticated } = require('../middlewares/auth');
const { getRecentProducts } = require('../controllers/products-controller');

router.get('/', getRecentProducts, function (req, res, next) {
  res.render('index', { title: 'Thrift Store', products: res.locals.data });
});

router.get('/login', (req, res) => {
  res.render('login-signup-form', { form: 'Login', action: '/users/login' });
});

router.get('/signup', (req, res) => {
  res.render('login-signup-form', { form: 'Sign Up', action: '/users/signup' });
});

router.get('/protected-route', isAuthenticated, (req, res, next) => {
  res.send(
    '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
  );
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

router.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});

module.exports = router;
