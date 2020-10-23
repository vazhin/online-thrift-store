const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProducts,
  getAProduct,
} = require('../controllers/products-controller');

const { validateData } = require('../controllers/validators/product-validator');

router.post('/', validateData, createProduct);

router.get('/', getProducts);

router.get('/:productId', getAProduct);

module.exports = router;
