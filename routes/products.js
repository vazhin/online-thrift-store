const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  createProduct,
  getProducts,
} = require('../controllers/products-controller');

router.post('/', [body('name').isLength({ min: 5 })], createProduct);

router.get('/', getProducts);

module.exports = router;
