// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/orders/all');
//         setOrders(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching orders');
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <p>Loading orders...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h2>Order List</h2>
//       {orders.length === 0 ? (
//         <p>No orders available</p>
//       ) : (
//         <ul>
//           {orders.map((order) => (
//             <li key={order._id}>
//               <h3>Order ID: {order._id}</h3>
//               <p>Total Amount: ${order.totalAmount}</p>
//               <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//               <ul>
//                 {order.products.map((item) => (
//                   <li key={item.product._id}>
//                     <p>{item.product.name} (Quantity: {item.quantity})</p>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default OrderList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Card, CardContent, Divider } from '@mui/material';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts
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

  if (loading) return <Typography>Loading orders...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Order List</Typography>
      {orders.length === 0 ? (
        <Typography>No orders available</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <div key={order._id}>
              <Card style={{ marginBottom: '15px' }}>
                <CardContent>
                  <Typography variant="h6">Order ID: {order._id}</Typography>
                  <Typography>Total Amount: ${order.totalAmount.toFixed(2)}</Typography>
                  <Typography>Order Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
                  <Typography variant="subtitle1">Products:</Typography>
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
                </CardContent>
              </Card>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </div>
  );
};

export default OrderList;
