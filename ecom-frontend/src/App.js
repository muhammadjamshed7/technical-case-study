import React, { useState, useEffect } from "react";
import Signup from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import CartPage from "./components/CartPage"; // Import the Cart Page
import { CartProvider } from "./context/CartContext"; // Import the Cart Provider
import OrderList from "./components/OrderList";
import { Button } from "@mui/material";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true); 
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); 
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
    localStorage.removeItem("isLoggedIn"); 
  };

  return (
    <CartProvider>
      {" "}
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/products" />
                ) : (
                  <Login setIsLoggedIn={handleLogin} /> // Show login page if not logged in
                )
              }
            />

            <Route path="/signup" element={<Signup />} />

            <Route
              path="/products"
              element={
                isLoggedIn ? (
                  <ProductList />
                ) : (
                  <Navigate to="/login" /> 
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
                  <Navigate to="/login" /> 
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
                  <Navigate to="/login" /> 
                )
              }
            />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>

          {isLoggedIn && (
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
