import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Form validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = ({ setIsLoggedIn }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use navigate hook for redirection

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://technical-case-study-backend.vercel.app/api/auth/login', {
        email: values.email,
        password: values.password,
      });

      setMessage(response.data.message);
      setIsLoggedIn(true);  // Set logged-in status
      navigate('/products');  // Redirect to product list
    } catch (error) {
      setMessage(error.response.data.error);
      setIsLoggedIn(false);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2>Login</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging In...' : 'Login'}
          </button>
          {message && <p>{message}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
