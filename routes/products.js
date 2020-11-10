const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/products');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  createProduct,
  getAProduct,
  getByCategory,
} = require('../controllers/products-controller');
const { isAuthenticated } = require('../middlewares/auth');
const { validateData } = require('../middlewares/validators/product-validator');

router.post(
  '/',
  isAuthenticated,
  upload.single('image'),
  validateData,
  createProduct
);
router.get('/:productId', getAProduct);
// router.get('/category/:category', getByCategory);

module.exports = router;
