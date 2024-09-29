// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
import ".././components/addmodal.css"

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch cart on mount
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get('https://technical-case-study-backend.vercel.app/api/cart', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
//           },
//         });
//         setCart(response.data.products);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   // Add product to cart
//   const addToCart = async (productId, quantity) => {
//     try {
//       const response = await axios.post(
//         'https://technical-case-study-backend.vercel.app/api/cart',
//         { productId, quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setCart(response.data.cart.products);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   // Remove product from cart (if needed, you can add more functions here)

//   return (
//     <CartContext.Provider value={{ cart, addToCart, loading }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch cart on mount
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get('https://technical-case-study-backend.vercel.app/api/cart', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
//           },
//         });
//         setCart(response.data.products);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   // Add product to cart
//   const addToCart = async (productId, quantity) => {
//     try {
//       const response = await axios.post(
//         'https://technical-case-study-backend.vercel.app/api/cart',
//         { productId, quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setCart(response.data.cart.products);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, loading }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch cart on mount
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get('https://technical-case-study-backend.vercel.app/api/cart');
//         setCart(response.data.products);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cart:', error);
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   // Add product to cart
//   const addToCart = async (productId, quantity) => {
//     try {
//       const response = await axios.post('https://technical-case-study-backend.vercel.app/api/cart', {
//         productId,
//         quantity,
//       });
//       setCart(response.data.cart.products);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, loading }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
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
        const response = await axios.get('https://technical-case-study-backend.vercel.app/api/cart');
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
      const response = await axios.post('https://technical-case-study-backend.vercel.app/api/cart', {
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
      const response = await axios.delete('https://technical-case-study-backend.vercel.app/api/cart/remove', {
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
