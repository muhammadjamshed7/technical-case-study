const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const router = express.Router();

// Route to add a new product
router.post('/products', addProduct);

// Route to get all products
router.get('/products', getProducts);

module.exports = router;
