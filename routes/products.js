const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  createProduct,
  getAProduct,
  getByCategory,
} = require('../controllers/products-controller');

const { validateData } = require('../middlewares/validators/product-validator');

router.post('/', upload.single('image'), validateData, createProduct);
router.get('/:productId', getAProduct);
router.get('/category/:category', getByCategory);

module.exports = router;
