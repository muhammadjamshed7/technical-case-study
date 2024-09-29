const Order = require('../model/order');

// Place a new order
exports.placeOrder = async (req, res) => {
  const { products, totalAmount } = req.body;

  try {
    const order = new Order({
      products,
      totalAmount,
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
