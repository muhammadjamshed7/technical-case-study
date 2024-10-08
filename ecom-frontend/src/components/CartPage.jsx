import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import { Button, Card, CardContent, Typography, List, Divider, Grid } from '@mui/material';

const CartPage = () => {
  const { cart, removeFromCart, loading } = useContext(CartContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (loading) return <p>Loading cart...</p>;

  // Calculate the total amount, ensuring price is treated as a number
  const totalAmount = cart.reduce((acc, item) => {
    const price = Number(item.product.price); // Ensure price is treated as a number
    return acc + price * item.quantity;
  }, 0);

  // Function to handle checkout
  const handleCheckout = async () => {
    try {
      // Send order to backend
      await axios.post('http://localhost:5001/api/orders/place', {
        products: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
        totalAmount,
      });

      // Show success message
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <div key={item.product._id}>
                <Card style={{ marginBottom: '15px' }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography variant="h6">{item.product.name}</Typography>
                        <Typography variant="body2">Price: ${Number(item.product.price).toFixed(2)}</Typography>
                        <Typography variant="body2">Quantity: {item.quantity}</Typography>
                      </Grid>
                      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => removeFromCart(item.product._id)}
                          size="small"
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Divider />
              </div>
            ))}
          </List>

          <Typography variant="h6" style={{ marginTop: '20px' }}>Total Amount: ${totalAmount.toFixed(2)}</Typography>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCheckout} 
            style={{ marginTop: '20px' }}
            fullWidth
          >
            Checkout
          </Button>

          {/* Snackbar to show order placed message */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert onClose={() => setSnackbarOpen(false)} severity="success">
              Your order has been placed successfully!
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default CartPage;
