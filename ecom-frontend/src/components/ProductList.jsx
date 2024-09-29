// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation

// // // const ProductList = () => {
// // //   const [products, setProducts] = useState([]); // Initialize products state
// // //   const [loading, setLoading] = useState(true); // Loading state
// // //   const [error, setError] = useState(null); // Error state
// // //   const navigate = useNavigate(); // Hook for navigation

// // //   // Fetch products from the backend when the component mounts
// // //   useEffect(() => {
// // //     const fetchProducts = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:5001/api/products'); // Adjust API URL if needed
// // //         setProducts(response.data); // Set the products in state
// // //         setLoading(false); // Turn off loading
// // //       } catch (err) {
// // //         setError('Error fetching products');
// // //         setLoading(false); // Turn off loading even if there's an error
// // //       }
// // //     };

// // //     fetchProducts(); // Call the function to fetch products
// // //   }, []); // Empty dependency array means this effect runs once when the component mounts

// // //   // Function to navigate to the add product page
// // //   const handleAddProduct = () => {
// // //     navigate('/add-product'); // Navigate to the add product page (update this route as needed)
// // //   };

// // //   if (loading) {
// // //     return <p>Loading products...</p>; // Show a loading message while the products are being fetched
// // //   }

// // //   if (error) {
// // //     return <p>{error}</p>; // Show error message if there's an issue fetching products
// // //   }

// // //   return (
// // //     <div>
// // //       <h2>Product List</h2>
// // //       <button onClick={handleAddProduct} className="add-product-button">Add Product</button> {/* Add Product Button */}
// // //       {products.length === 0 ? (
// // //         <p>No products available</p> // If there are no products, show this message
// // //       ) : (
// // //         <ul>
// // //           {products.map((product) => (
// // //             <li key={product._id}>
// // //               <h3>{product.name}</h3>
// // //               <p>Price: ${product.price}</p>
// // //               <p>Category: {product.category}</p>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ProductList;



// // //correct code




// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation
// // // import './addmodal.css'; // Import CSS for styling

// // // const ProductList = () => {
// // //   const [products, setProducts] = useState([]); // Initialize products state as an empty array
// // //   const [loading, setLoading] = useState(true); // Loading state
// // //   const [error, setError] = useState(null); // Error state
// // //   const [page, setPage] = useState(1); // Pagination state for current page
// // //   const [totalPages, setTotalPages] = useState(1); // Total number of pages
// // //   const navigate = useNavigate(); // Hook for navigation

// // //   // Fetch products from the backend when the component mounts or page changes
// // //   useEffect(() => {
// // //     const fetchProducts = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:5001/api/products', {
// // //           params: { page, limit: 10 },
// // //         });
// // //         if (response.data && Array.isArray(response.data.products)) {
// // //           setProducts(response.data.products);
// // //         } else {
// // //           setProducts([]);
// // //         }
// // //         setTotalPages(response.data.totalPages || 1);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         setError('Error fetching products');
// // //         setLoading(false);
// // //       }
// // //     };
  
// // //     fetchProducts();
// // //   }, [page]);
// // //    // Re-run when page changes

// // //   // Function to navigate to the add product page
// // //   const handleAddProduct = () => {
// // //     navigate('/add-product'); // Navigate to the add product page
// // //   };

// // //   // Function to change the page
// // //   const handlePageChange = (newPage) => {
// // //     if (newPage >= 1 && newPage <= totalPages) {
// // //       setPage(newPage); // Set the new page number
// // //     }
// // //   };

// // //   if (loading) {
// // //     return <p>Loading products...</p>; // Show a loading message while the products are being fetched
// // //   }

// // //   if (error) {
// // //     return <p>{error}</p>; // Show error message if there's an issue fetching products
// // //   }

// // //   return (
// // //     <div className="product-list-container">
// // //       <h2>Product List</h2>
// // //       <button onClick={handleAddProduct} className="add-product-button">Add Product</button> {/* Add Product Button */}

// // //       {/* Product Cards */}
// // //       {products.length === 0 ? (
// // //         <p>No products available</p> // If there are no products, show this message
// // //       ) : (
// // //         <div className="product-grid">
// // //           {products.map((product) => (
// // //             <div key={product._id} className="product-card">
// // //               <h3>{product.name}</h3>
// // //               <p>Price: ${product.price}</p>
// // //               <p>Category: {product.category}</p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* Pagination Controls */}
// // //       <div className="pagination">
// // //         <button
// // //           onClick={() => handlePageChange(page - 1)}
// // //           disabled={page === 1}
// // //         >
// // //           Previous
// // //         </button>
// // //         {Array.from({ length: totalPages }, (_, index) => (
// // //           <button
// // //             key={index}
// // //             onClick={() => handlePageChange(index + 1)}
// // //             className={page === index + 1 ? 'active' : ''}
// // //           >
// // //             {index + 1}
// // //           </button>
// // //         ))}
// // //         <button
// // //           onClick={() => handlePageChange(page + 1)}
// // //           disabled={page === totalPages}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductList;
// // import React, { useEffect, useState, useContext } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation
// // import { CartContext } from '../context/CartContext'; // Import the CartContext for managing the cart
// // import './addmodal.css'; // CSS for styling

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]); // Initialize products state
// //   const [loading, setLoading] = useState(true); // Loading state
// //   const [error, setError] = useState(null); // Error state
// //   const [page, setPage] = useState(1); // Pagination state for current page
// //   const [totalPages, setTotalPages] = useState(1); // Total number of pages
// //   const navigate = useNavigate(); // Hook for navigation

// //   const { addToCart } = useContext(CartContext); // Access the addToCart function from the CartContext

// //   // Fetch products from the backend when the component mounts or page changes
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5001/api/products', {
// //           params: { page, limit: 10 },
// //         });
// //         if (response.data && Array.isArray(response.data.products)) {
// //           setProducts(response.data.products);
// //         } else {
// //           setProducts([]);
// //         }
// //         setTotalPages(response.data.totalPages || 1);
// //         setLoading(false);
// //       } catch (err) {
// //         setError('Error fetching products');
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, [page]); // Re-run when page changes

// //   // Function to navigate to the add product page
// //   const handleAddProduct = () => {
// //     navigate('/add-product'); // Navigate to the add product page
// //   };

// //   // Function to change the page
// //   const handlePageChange = (newPage) => {
// //     if (newPage >= 1 && newPage <= totalPages) {
// //       setPage(newPage); // Set the new page number
// //     }
// //   };

// //   // Handle adding products to the cart
// //   const handleAddToCart = (productId) => {
// //     addToCart(productId, 1); // Add the product to the cart with a quantity of 1
// //   };

// //   if (loading) {
// //     return <p>Loading products...</p>; // Show a loading message while the products are being fetched
// //   }

// //   if (error) {
// //     return <p>{error}</p>; // Show error message if there's an issue fetching products
// //   }

// //   return (
// //     <div className="product-list-container">
// //       <h2>Product List</h2>
// //       <button onClick={handleAddProduct} className="add-product-button">Add Product</button> {/* Add Product Button */}

// //       {/* Product Cards */}
// //       {products.length === 0 ? (
// //         <p>No products available</p> // If there are no products, show this message
// //       ) : (
// //         <div className="product-grid">
// //           {products.map((product) => (
// //             <div key={product._id} className="product-card">
// //               <h3>{product.name}</h3>
// //               <p>Price: ${product.price}</p>
// //               <p>Category: {product.category}</p>
// //               <button onClick={() => handleAddToCart(product._id)} className="add-to-cart-button">
// //                 Add to Cart
// //               </button> {/* Add to Cart Button */}
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Pagination Controls */}
// //       <div className="pagination">
// //         <button
// //           onClick={() => handlePageChange(page - 1)}
// //           disabled={page === 1}
// //         >
// //           Previous
// //         </button>
// //         {Array.from({ length: totalPages }, (_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => handlePageChange(index + 1)}
// //             className={page === index + 1 ? 'active' : ''}
// //           >
// //             {index + 1}
// //           </button>
// //         ))}
// //         <button
// //           onClick={() => handlePageChange(page + 1)}
// //           disabled={page === totalPages}
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductList;
// // import React, { useEffect, useState, useContext } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { CartContext } from '../context/CartContext'; // Import Cart Context
// // import { FaShoppingCart } from 'react-icons/fa'; // Import a cart icon from react-icons

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [page, setPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const navigate = useNavigate();

// //   const { addToCart } = useContext(CartContext); // Access addToCart function from context

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5001/api/products', {
// //           params: { page, limit: 10 },
// //         });
// //         setProducts(response.data.products);
// //         setTotalPages(response.data.totalPages || 1);
// //         setLoading(false);
// //       } catch (err) {
// //         setError('Error fetching products');
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, [page]);

// //   const handleAddToCart = (productId) => {
// //     addToCart(productId, 1); // Add the product with quantity 1 to the cart
// //   };

// //   if (loading) {
// //     return <p>Loading products...</p>;
// //   }

// //   if (error) {
// //     return <p>{error}</p>;
// //   }

// //   return (
// //     <div className="product-list-container">
// //       <h2>Product List</h2>

// //       {/* Add Cart Icon */}
// //       <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
// //         <FaShoppingCart size={30} /> {/* Cart Icon */}
// //       </div>

// //       {products.length === 0 ? (
// //         <p>No products available</p>
// //       ) : (
// //         <div className="product-grid">
// //           {products.map((product) => (
// //             <div key={product._id} className="product-card">
// //               <h3>{product.name}</h3>
// //               <p>Price: ${product.price}</p>
// //               <p>Category: {product.category}</p>
// //               <button onClick={() => handleAddToCart(product._id)} className="add-to-cart-button">
// //                 Add to Cart
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       <div className="pagination">
// //         <button onClick={() => setPage(page - 1)} disabled={page === 1}>
// //           Previous
// //         </button>
// //         {Array.from({ length: totalPages }, (_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => setPage(index + 1)}
// //             className={page === index + 1 ? 'active' : ''}
// //           >
// //             {index + 1}
// //           </button>
// //         ))}
// //         <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductList;



// //code is fine above

// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../context/CartContext'; // Import Cart Context
// import { FaShoppingCart } from 'react-icons/fa'; // Import a cart icon from react-icons

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   const { addToCart } = useContext(CartContext); // Access addToCart function from context

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/products', {
//           params: { page, limit: 10 },
//         });
//         setProducts(response.data.products);
//         setTotalPages(response.data.totalPages || 1);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching products');
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [page]);

//   const handleAddToCart = (productId) => {
//     addToCart(productId, 1); // Add the product with quantity 1 to the cart
//   };

//   if (loading) {
//     return <p>Loading products...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="product-list-container">
//       <h2>Product List</h2>

//       {/* Add Cart Icon */}
//       <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
//         <FaShoppingCart size={30} /> {/* Cart Icon */}
//       </div>

//       {products.length === 0 ? (
//         <p>No products available</p>
//       ) : (
//         <div className="product-grid">
//           {products.map((product) => (
//             <div key={product._id} className="product-card">
//               <h3>{product.name}</h3>
//               <p>Price: ${product.price}</p>
//               <p>Category: {product.category}</p>
//               <button onClick={() => handleAddToCart(product._id)} className="add-to-cart-button">
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="pagination">
//         <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => setPage(index + 1)}
//             className={page === index + 1 ? 'active' : ''}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductList;



import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import Cart Context
import { FaShoppingCart } from 'react-icons/fa'; // Import a cart icon from react-icons

const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: '$0 - $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200+', min: 200, max: Infinity },
];

const sortingOptions = [
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]); // Selected price range
  const [sortOrder, setSortOrder] = useState(sortingOptions[0].value); // Sorting order

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // Access addToCart function from context

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products', {
          params: { page, limit: 10 },
        });
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); // Initialize filtered products
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  // Filter and sort the products
  useEffect(() => {
    const filtered = products.filter((product) => {
      return product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredProducts(sorted);
  }, [products, selectedPriceRange, sortOrder]);

  const handleAddToCart = (productId) => {
    addToCart(productId, 1); // Add the product with quantity 1 to the cart
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-list-container">
      <h2>Product List</h2>

      {/* Add Cart Icon */}
      <div style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
        <FaShoppingCart size={30} /> {/* Cart Icon */}
      </div>

      {/* Price Filter */}
      <label>
        Filter by Price:
        <select value={selectedPriceRange.label} onChange={(e) => {
          const selectedRange = priceRanges.find(range => range.label === e.target.value);
          setSelectedPriceRange(selectedRange);
        }}>
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>{range.label}</option>
          ))}
        </select>
      </label>

      {/* Sort by Price */}
      <label>
        Sort by Price:
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          {sortingOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      {filteredProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <button onClick={() => handleAddToCart(product._id)} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
