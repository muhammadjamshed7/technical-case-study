const Cart = require("../model/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("products.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({
        products: [{ product: productId, quantity }],
      });
    } else {
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json({ message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart=await Cart.findOneAndUpdate(
      {
        "products.product": mongoose.Types.ObjectId(productId),
      },
      { $pull: { products: { product: mongoose.Types.ObjectId(productId) } } }
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to remove it from the cart
    // cart.products = cart.products.filter((item) => item.product.toString() !== productId);

    // await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
