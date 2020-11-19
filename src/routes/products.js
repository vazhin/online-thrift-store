const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/products');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const {
  createProduct,
  getAProduct,
  deleteProduct,
  editProduct,
  editImage,
} = require('../controllers/products-controller');
const { isAuthenticated } = require('../middlewares/auth');

router.post('/', isAuthenticated, upload.single('image'), createProduct);
router.get('/:productId', getAProduct);
router.delete('/:productId', deleteProduct);
router.post('/:productId/edit', editProduct);
router.put('/:productId/image', upload.single('image'), editImage);

module.exports = router;
