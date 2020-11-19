import express from 'express';
const router = express.Router();

import { isAuthenticated } from '../middlewares/auth';
import { getAllProducts } from '../controllers/products-controller';
import { renderHomepage } from '../controllers';

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
