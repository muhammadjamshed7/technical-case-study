
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cartRoutes = require('./routes/cartRoutes');

// Import routes
const productRoutes = require('./routes/productRoutes'); // Product routes
const authRoutes = require('./routes/authRoute'); // Auth routes

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

// Start the server

// Use cart routes
app.use('/api', cartRoutes);
app.use('/api/cart', cartRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
