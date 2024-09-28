// // // const express = require('express');
// // // const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
// // // const authMiddleware = require('../middleware/auth'); // Assuming authentication middleware exists

// // // const router = express.Router();

// // // // Add to cart
// // // router.post('/cart', authMiddleware, addToCart);

// // // // Get cart
// // // router.get('/cart', authMiddleware, getCart);

// // // // Remove from cart
// // // router.delete('/cart/:productId', authMiddleware, removeFromCart);

// // // module.exports = router;
// // const express = require('express');
// // const { getCart, addToCart } = require('../controllers/cartController');
// // const { authMiddleware } = require('../middleware/authMiddleware'); // Assuming you have an auth middleware

// // const router = express.Router();

// // router.get('/', authMiddleware, getCart); // Get the cart for the logged-in user
// // router.post('/', authMiddleware, addToCart); // Add a product to the cart

// // module.exports = router;
// const express = require('express');
// const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

// const router = express.Router();

// // Get the cart
// router.get('/', getCart);

// // Add a product to the cart
// router.post('/', addToCart);

// // Remove a product from the cart
// router.delete('/', removeFromCart);

// module.exports = router;
const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

// Get the cart
router.get('/', getCart);

// Add a product to the cart
router.post('/', addToCart);

// Remove a product from the cart
router.delete('/', removeFromCart);

module.exports = router;
