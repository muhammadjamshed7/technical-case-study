import axios from 'axios';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/products', {
        name,
        price: Number(price), // Ensure the price is sent as a number
        category,
      });

      setMessage('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message); // Log the error
      setMessage('Error adding product');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add a New Product
        </Typography>

        {message && (
          <Typography color={message.includes('Error') ? 'error' : 'success'} align="center" sx={{ marginBottom: 2 }}>
            {message}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct;

