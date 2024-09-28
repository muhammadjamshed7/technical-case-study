// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation

// const ProductList = () => {
//   const [products, setProducts] = useState([]); // Initialize products state
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const navigate = useNavigate(); // Hook for navigation

//   // Fetch products from the backend when the component mounts
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products'); // Adjust API URL if needed
//         setProducts(response.data); // Set the products in state
//         setLoading(false); // Turn off loading
//       } catch (err) {
//         setError('Error fetching products');
//         setLoading(false); // Turn off loading even if there's an error
//       }
//     };

//     fetchProducts(); // Call the function to fetch products
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   // Function to navigate to the add product page
//   const handleAddProduct = () => {
//     navigate('/add-product'); // Navigate to the add product page (update this route as needed)
//   };

//   if (loading) {
//     return <p>Loading products...</p>; // Show a loading message while the products are being fetched
//   }

//   if (error) {
//     return <p>{error}</p>; // Show error message if there's an issue fetching products
//   }

//   return (
//     <div>
//       <h2>Product List</h2>
//       <button onClick={handleAddProduct} className="add-product-button">Add Product</button> {/* Add Product Button */}
//       {products.length === 0 ? (
//         <p>No products available</p> // If there are no products, show this message
//       ) : (
//         <ul>
//           {products.map((product) => (
//             <li key={product._id}>
//               <h3>{product.name}</h3>
//               <p>Price: ${product.price}</p>
//               <p>Category: {product.category}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ProductList;



//correct code




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation
import './addmodal.css'; // Import CSS for styling

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initialize products state as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [page, setPage] = useState(1); // Pagination state for current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const navigate = useNavigate(); // Hook for navigation

  // Fetch products from the backend when the component mounts or page changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          params: { page, limit: 10 },
        });
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [page]);
   // Re-run when page changes

  // Function to navigate to the add product page
  const handleAddProduct = () => {
    navigate('/add-product'); // Navigate to the add product page
  };

  // Function to change the page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // Set the new page number
    }
  };

  if (loading) {
    return <p>Loading products...</p>; // Show a loading message while the products are being fetched
  }

  if (error) {
    return <p>{error}</p>; // Show error message if there's an issue fetching products
  }

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <button onClick={handleAddProduct} className="add-product-button">Add Product</button> {/* Add Product Button */}

      {/* Product Cards */}
      {products.length === 0 ? (
        <p>No products available</p> // If there are no products, show this message
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={page === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
