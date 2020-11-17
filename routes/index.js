var express = require('express');
var router = express.Router();

const { isAuthenticated } = require('../middlewares/auth');
const { getAllProducts } = require('../controllers/products-controller');
const { renderHomepage } = require('../controllers');

router.get('/', getAllProducts, renderHomepage);
router.get('/search', getAllProducts, renderHomepage);

router.get('/signup', (req, res) => {
  res.render('signup-form');
});

router.get('/login', (req, res) => {
  res.render('login-form', { errors: req.flash('error') });
});

router.get('/product/', isAuthenticated, (req, res, next) => {
  res.render('create-product-form', { user: req.user });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
