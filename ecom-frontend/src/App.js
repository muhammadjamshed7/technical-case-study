import React, { useState } from 'react';
import Signup from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/products" /> : <Login setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={isLoggedIn ? <ProductList /> : <Navigate to="/login" />} />
          <Route path="/add-product" element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;