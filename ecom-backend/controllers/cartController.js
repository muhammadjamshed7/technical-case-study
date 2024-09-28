// const Cart = require('../model/Cart');
// const Product = require('../models/Product');

// // Add product to cart
// exports.addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user.id; // Assuming user is authenticated

//   try {
//     // Find the user's cart or create a new one
//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       cart = new Cart({ user: userId, products: [] });
//     }

//     // Check if the product already exists in the cart
//     const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

//     if (productIndex !== -1) {
//       // If product exists, update the quantity
//       cart.products[productIndex].quantity += quantity;
//     } else {
//       // Otherwise, add new product to the cart
//       const product = await Product.findById(productId);
//       cart.products.push({ product: product._id, quantity });
//     }

//     await cart.save();
//     res.status(200).json({ message: 'Product added to cart', cart });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get cart for authenticated user
// exports.getCart = async (req, res) => {
//   const userId = req.user.id; // Assuming user is authenticated

//   try {
//     const cart = await Cart.findOne({ user: userId }).populate('products.product');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Remove product from cart
// exports.removeFromCart = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.user.id; // Assuming user is authenticated

//   try {
//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }

//     // Remove product from cart
//     cart.products = cart.products.filter(p => p.product.toString() !== productId);
//     await cart.save();

//     res.status(200).json({ message: 'Product removed from cart', cart });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// const Cart = require('../model/Cart');

// // Fetch the cart for the authenticated user
// exports.getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
//     if (!cart) return res.status(404).json({ message: 'Cart not found' });
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Add product to cart
// exports.addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   try {
//     let cart = await Cart.findOne({ user: req.user.id });
    
//     // If no cart exists for the user, create one
//     if (!cart) {
//       cart = new Cart({
//         user: req.user.id,
//         products: [{ product: productId, quantity }],
//       });
//     } else {
//       // If the product already exists in the cart, update the quantity
//       const existingProduct = cart.products.find((item) => item.product.toString() === productId);
//       if (existingProduct) {
//         existingProduct.quantity += quantity;
//       } else {
//         cart.products.push({ product: productId, quantity });
//       }
//     }

//     await cart.save();
//     res.status(201).json({ message: 'Product added to cart', cart });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const Cart = require('../model/Cart');

// Fetch the cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('products.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if a cart exists, otherwise create a new cart
    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({
        products: [{ product: productId, quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const existingProduct = cart.products.find((item) => item.product.toString() === productId);

      if (existingProduct) {
        // If product exists, update its quantity
        existingProduct.quantity += quantity;
      } else {
        // Otherwise, add the new product
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json({ message: 'Product added to cart', cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the product to remove it from the cart
    cart.products = cart.products.filter((item) => item.product.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
