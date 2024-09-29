const express = require('express');
const { placeOrder, getOrders } = require('../controllers/orderController');

const router = express.Router();

// Place an order
router.post('/place', placeOrder);

// Get all orders
router.get('/all', getOrders);

module.exports = router;
