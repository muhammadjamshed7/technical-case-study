
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cartRoutes = require('./routes/cartRoutes');

// Import routes
const productRoutes = require('./routes/productRoutes'); // Product routes
const Order = require('./model/order');
const authRoutes = require('./routes/authRoute'); 
const orderRoutes = require('./routes/orderRoutes'); 
// Auth routes

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api', productRoutes);   // Product routes
app.post('/api/orders/place', async (req, res) => {
  const { products, totalAmount } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'No products provided' });
  }

  try {
    // Create a new order
    const order = new Order({
      products,
      totalAmount,
    });

    // Save order to database
    await order.save();

    return res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});
app.use('/api/orders', orderRoutes);


// Use cart routes
app.use('/api', cartRoutes);
app.use('/api/cart', cartRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
