import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import {  FaShoppingCart } from 'react-icons/fa';
import { RiShoppingBag2Fill } from "react-icons/ri";
import {
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
} from '@mui/material';
// Import the AddProducts component
import AddProduct from './AddProduct';

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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortOrder, setSortOrder] = useState(sortingOptions[0].value);
  const [showAddProduct, setShowAddProduct] = useState(false); 

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products', {
          params: { page, limit: 10 },
        });
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]); 

  useEffect(() => {
    const filtered = products.filter((product) => {
      return product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    });

    const sorted = filtered.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(sorted);
  }, [products, selectedPriceRange, sortOrder]);

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  };

  const handleProductAdded = () => {
   
    setPage(1);
    setShowAddProduct(false); 
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container maxWidth="lg">
   
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop:3 }}
        onClick={() => setShowAddProduct(!showAddProduct)}
      >
        {showAddProduct ? 'Show Product List' : 'Add New Product'}
      </Button>

      {showAddProduct ? (
        <AddProduct onProductAdded={handleProductAdded} />
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Product List
          </Typography>

          {/* Add Cart Icon */}
          <Box sx={{ position: 'absolute', top: '10px', right: '120px', cursor: 'pointer',display:'flex',gap:'20px' }}>
            <FaShoppingCart size={30} onClick={() => navigate('/cart')} />
              <RiShoppingBag2Fill size={30} onClick={() => navigate('/orders')}/>
          </Box>
          <Grid container spacing={3} justifyContent="space-between" sx={{ marginBottom: 3 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Filter by Price</InputLabel>
                <Select
                  value={selectedPriceRange.label}
                  onChange={(e) => {
                    const selectedRange = priceRanges.find(
                      (range) => range.label === e.target.value
                    );
                    setSelectedPriceRange(selectedRange);
                  }}
                >
                  {priceRanges.map((range) => (
                    <MenuItem key={range.label} value={range.label}>
                      {range.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sort by Price</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  {sortingOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

         
          {filteredProducts.length === 0 ? (
            <Typography align="center">No products available</Typography>
          ) : (
            <Grid container spacing={4}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Box sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 2 }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography>Price: ${product.price}</Typography>
                    <Typography>Category: {product.category}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 2 }}
                      onClick={() => handleAddToCart(product._id)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)} 
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ProductList;
