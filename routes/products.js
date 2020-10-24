const express = require('express');
const router = express.Router();

const {
  createProduct,
  getRecentProducts,
  getAProduct,
  getByCategory,
} = require('../controllers/products-controller');

const { validateData } = require('../controllers/validators/product-validator');

router.post('/', validateData, createProduct);

router.get('/recent', getRecentProducts);

router.get('/:category', getByCategory);

router.get('/:productId', getAProduct);

module.exports = router;
