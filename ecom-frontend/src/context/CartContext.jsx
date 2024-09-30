import ".././components/addmodal.css"

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/cart');
        setCart(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Add product to cart
  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post('http://localhost:5001/api/cart', {
        productId,
        quantity,
      });
      setCart(response.data.cart.products);
      console.log('Product added to cart', response.data.cart.products);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete('http://localhost:5001/api/cart/remove', {
        productId,
        
      });
      setCart(response.data.cart.products);
      console.log('Product added to cart', response.data.cart.products);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart,removeFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
