// import React, { useState } from 'react';
// import Signup from './components/Auth/SignUp';
// import Login from './components/Auth/Login';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import ProductList from './components/ProductList';
// import AddProduct from './components/AddProduct';
// import CartPage from './components/CartPage'; // Import the Cart Page
// import { CartProvider } from './context/CartContext'; // Import the Cart Provider

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

//   // Function to handle login (can be customized with authentication logic)
//   const handleLogin = () => {
//     setIsLoggedIn(true); // Set login status to true
//   };

//   return (
//     <CartProvider> {/* Wrap the app in CartProvider */}
//       <Router>
//         <div className="App">
//           <Routes>
//             {/* Login Route */}
//             <Route
//               path="/login"
//               element={
//                 isLoggedIn ? (
//                   <Navigate to="/products" /> // Redirect to products if logged in
//                 ) : (
//                   <Login setIsLoggedIn={handleLogin} /> // Show login page if not logged in
//                 )
//               }
//             />

//             {/* Signup Route */}
//             <Route path="/signup" element={<Signup />} />

//             {/* Protected Route: Product List */}
//             <Route
//               path="/products"
//               element={
//                 isLoggedIn ? (
//                   <ProductList />
//                 ) : (
//                   <Navigate to="/login" /> // Redirect to login if not logged in
//                 )
//               }
//             />

//             {/* Protected Route: Add Product */}
//             <Route
//               path="/add-product"
//               element={
//                 isLoggedIn ? (
//                   <AddProduct />
//                 ) : (
//                   <Navigate to="/login" /> // Redirect to login if not logged in
//                 )
//               }
//             />

//             {/* Protected Route: Cart Page */}
//             <Route
//               path="/cart"
//               element={
//                 isLoggedIn ? (
//                   <CartPage /> // Display cart page
//                 ) : (
//                   <Navigate to="/login" /> // Redirect to login if not logged in
//                 )
//               }
//             />

//             {/* Fallback Route: Redirect to Login */}
//             <Route path="*" element={<Navigate to="/login" />} />
//           </Routes>
//         </div>
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import Signup from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import CartPage from './components/CartPage'; // Import the Cart Page
import { CartProvider } from './context/CartContext'; // Import the Cart Provider
import OrderList from './components/OrderList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // When the app loads, check if the user is already logged in from localStorage
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true); // Set the login state to true if user is logged in
    }
  }, []);

  // Function to handle login (can be customized with authentication logic)
  const handleLogin = () => {
    setIsLoggedIn(true); // Set login status to true
    localStorage.setItem('isLoggedIn', 'true'); // Store the login status in localStorage
  };

  // Function to handle logout and clear login state
  const handleLogout = () => {
    setIsLoggedIn(false); // Set login status to false
    localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
  };

  return (
    <CartProvider> {/* Wrap the app in CartProvider */}
      <Router>
        <div className="App">
          <Routes>
            {/* Login Route */}
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/products" /> // Redirect to products if logged in
                ) : (
                  <Login setIsLoggedIn={handleLogin} /> // Show login page if not logged in
                )
              }
            />

            {/* Signup Route */}
            <Route path="/signup" element={<Signup />} />

            {/* Protected Route: Product List */}
            <Route
              path="/products"
              element={
                isLoggedIn ? (
                  <ProductList />
                ) : (
                  <Navigate to="/login" /> // Redirect to login if not logged in
                )
              }
            />

            {/* Protected Route: Add Product */}
            <Route
              path="/add-product"
              element={
                isLoggedIn ? (
                  <AddProduct />
                ) : (
                  <Navigate to="/login" /> // Redirect to login if not logged in
                )
              }
            />
             <Route
              path="/orders"
              element={
                
                  <OrderList /> // Display order list page
                
              }
            />

            {/* Protected Route: Cart Page */}
            <Route
              path="/cart"
              element={
                isLoggedIn ? (
                  <CartPage /> // Display cart page
                ) : (
                  <Navigate to="/login" /> // Redirect to login if not logged in
                )
              }
            />

            {/* Fallback Route: Redirect to Login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>

          {/* Optional Logout Button (for testing) */}
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
