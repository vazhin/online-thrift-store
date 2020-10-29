const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAProduct,
  getByCategory,
} = require('../controllers/products-controller');

const { validateData } = require('../middlewares/validators/product-validator');

router.post('/', validateData, createProduct);
router.get('/:productId', getAProduct);
router.get('/category/:category', getByCategory);

module.exports = router;
