import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Button,
  Collapse,
  Box,
  Divider,
} from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const route=useNavigate()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null); // Track which order is expanded

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/orders/all');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleToggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId); // Toggle expand/collapse
  };

  if (loading) return <Typography>Loading orders...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <FaArrowLeft onClick={()=>route('/products')} style={{cursor:'pointer',fontSize:'24px',marginBottom:'10px'}}/>
      <Typography variant="h4" gutterBottom>
        Order List
      </Typography>
      {orders.length === 0 ? (
        <Typography>No orders available</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <Card key={order._id} style={{ marginBottom: '15px' }}>
              <CardContent>
                {/* Basic Order Information */}
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography>Total Amount: ${order.totalAmount.toFixed(2)}</Typography>
                <Typography>Order Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>

                {/* Expand/Collapse Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleToggleExpand(order._id)}
                    color={expandedOrder === order._id ? 'secondary' : 'primary'}
                  >
                    {expandedOrder === order._id ? 'Hide Details' : 'View Details'}
                  </Button>
                </Box>

                {/* Expandable section */}
                <Collapse in={expandedOrder === order._id} timeout="auto" unmountOnExit>
                  <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                    Products:
                  </Typography>
                  <List>
                    {order.products.map((item) => (
                      <ListItem key={item.product._id}>
                        <ListItemText
                          primary={item.product.name}
                          secondary={`Quantity: ${item.quantity}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </div>
  );
};

export default OrderList;
