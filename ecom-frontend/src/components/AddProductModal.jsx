

import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './addmodal.css';

// Form validation schema using Yup
const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  category: Yup.string().required('Category is required'),
});

const AddProductModal = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null); // Store the selected image file
  const [imagePreview, setImagePreview] = useState(''); // Preview the uploaded image

  // Function to convert the image to a Base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // Base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to handle image change and store in localStorage
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (file.size > 5000000) { // Check if file size exceeds 5MB
          alert('File size exceeds 5MB limit!');
          return;
        }
        const base64String = await convertToBase64(file);
        setImagePreview(base64String); // Set preview of the image
        localStorage.setItem('productImage', base64String); // Store in localStorage
        console.log('Image converted to Base64 and stored in localStorage:', base64String);
      } catch (error) {
        console.error('Error converting image to Base64:', error);
      }
    }
  };

  // Function to handle adding the product, including sending the Base64 image to the backend
  const handleAddProduct = async (values, { setSubmitting }) => {
    try {
      // Retrieve image from localStorage
      const imageBase64 = localStorage.getItem('productImage') || '';

      if (!imageBase64) {
        alert('No image found in localStorage. Please upload an image.');
        setSubmitting(false);
        return;
      }

      console.log('Submitting the following product data:', {
        name: values.name,
        price: values.price,
        category: values.category,
        image: imageBase64,
      });

      // Send product details including Base64 image to the backend
      const response = await axios.post('http://localhost:5000/api/products', {
        name: values.name,
        price: values.price,
        category: values.category,
        image: imageBase64, // Send the Base64 image string
      });

      setMessage('Product added successfully');
      setSubmitting(false);
      onClose();
      window.location.reload(); // Reload to refresh the product list
    } catch (error) {
      console.error('Error occurred during product submission:', error);
      setMessage('Error occurred');
      setSubmitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>

        <Formik
          initialValues={{ name: '', price: '', category: '' }}
          validationSchema={ProductSchema}
          onSubmit={handleAddProduct} // Form submission handler
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="name">Product Name:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <Field type="number" name="price" />
                <ErrorMessage name="price" component="div" />
              </div>
              <div>
                <label htmlFor="category">Category:</label>
                <Field type="text" name="category" />
                <ErrorMessage name="category" component="div" />
              </div>

              {/* File input for image upload */}
              <div>
                <label htmlFor="image">Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange} // Handle image selection and conversion
                />
              </div>

              {/* Image preview */}
              {imagePreview && <img src={imagePreview} alt="Preview" width="100" height="100" />}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </Form>
          )}
        </Formik>

        {/* Close Button */}
        <button onClick={onClose}>Close</button>

        {/* Safely render the message */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddProductModal;

