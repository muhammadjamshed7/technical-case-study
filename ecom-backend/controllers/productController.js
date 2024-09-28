const Product = require('../model/Product'); // Assuming you have a Product model



// Get all products with optional pagination
exports.getProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Get page and limit from query params
  
    try {
      const skip = (page - 1) * limit; // Calculate how many products to skip
      const products = await Product.find().skip(skip).limit(parseInt(limit)); // Fetch products with pagination
  
      const totalProducts = await Product.countDocuments(); // Get total number of products
      const totalPages = Math.ceil(totalProducts / limit); // Calculate total pages
  
      res.json({ products, totalPages, currentPage: page });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  // Controller to add a new product
  exports.addProduct = async (req, res) => {
    const { name, price, category } = req.body;
  
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }
  
    try {
      const product = new Product({
        name,
        price,
        category,
      });
  
      await product.save();
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };