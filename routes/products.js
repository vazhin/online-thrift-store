const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
} = require('../controllers/products-controller');

const { validateData } = require('../controllers/validators/product-validator');

router.post('/', validateData, createProduct);

router.get('/', getProducts);

module.exports = router;
