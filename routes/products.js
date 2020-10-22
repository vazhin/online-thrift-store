const express = require('express');
const router = express.Router();

const { createProduct } = require('../controllers/products-controller');

router.post('/', createProduct);

module.exports = router;
