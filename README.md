 Technical caste-study  E Commerce Web Application

This is a MERN stack (MongoDB, Express, React, Node.js) e commerce web application allowing users to browse products, add items to a cart, place orders, and view their previous orders.

   Features

    User Authentication  : Sign up, log in, and log out.
    Product Management  : Add new products (admin).
    Shopping Cart  : Add, remove, and view products in the cart.
    Order Placement  : Place and view orders.
    Protected Routes  : Access restricted to authenticated users.

   Technologies

    Frontend  : React, Axios, Material UI, React Router
    Backend  : Node.js, Express, MongoDB, Mongoose
    Deployment  : Vercel (Backend), GitHub Pages (Frontend)

   Installation

    Prerequisites
  [Node.js](https://nodejs.org/)
  [MongoDB](https://www.mongodb.com/)

 Install Dependencies

npm install


Create a `.env` file and add your MongoDB connection

MONGO_URI=mongodb+srv://casestudy:casestudy@cluster0.7e7go.mongodb.net/casestudy?retryWrites=true&w=majority
PORT=5001


   API Endpoints

  Method   Endpoint                Description                    
                                                                  
  POST     `/api/auth/login`        Logs in a user                 
  POST     `/api/auth/signup`       Registers a new user           
  GET      `/api/products`          Fetches product list           
  POST     `/api/products`          Adds a product (admin)         
  GET      `/api/cart`              Fetches cart items             
  POST     `/api/cart`              Adds product to the cart       
  DELETE   `/api/cart`              Removes product from the cart  
  POST     `/api/orders/place`      Places an order                
  GET      `/api/orders`            Fetches user orders            

   Usage

1.   Sign up or log in   to browse products.
2.   Add products   to your cart and   checkout  .
3. View   order history   on the Orders page.





This version is more concise and to the point for users or contributors. Let me know if you'd like further changes!
