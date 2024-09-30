const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

// Get the cart
router.get('/', getCart);

// Add a product to the cart
router.post('/', addToCart);

// Remove a product from the cart
router.delete('/remove', removeFromCart);

module.exports = router;
