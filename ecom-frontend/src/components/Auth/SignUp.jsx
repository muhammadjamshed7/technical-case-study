

import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Form validation schema using Yup
const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = () => {
  const [message, setMessage] = useState('');
  const [signedUp, setSignedUp] = useState(false); // State to track signup status

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/signup', {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      setMessage(response.data.message);
      setSignedUp(true);
    } catch (error) {
      setMessage(error.response.data.error);
      setSignedUp(false);
    }
    setSubmitting(false); // Stop form submission
  };

  if (signedUp) {
    return <h2>{message}</h2>; // Show success message after signup
  }

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={handleSignup}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2>Sign Up</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
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
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
          {message && <p>{message}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
