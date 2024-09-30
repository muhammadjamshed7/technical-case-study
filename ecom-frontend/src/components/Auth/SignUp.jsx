import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Alert, CircularProgress, Grid } from '@mui/material';

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
    return (
      <Typography variant="h5" align="center" sx={{ marginTop: 4 }}>
        {message}
      </Typography>
    ); // Show success message after signup
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: '400px',
          margin: '100px auto',
          padding: 3,
          boxShadow: 3, // MUI Box shadow
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting, values, handleChange, handleBlur }) => (
            <Form noValidate>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="username" component="div" />}
                    error={!!values.username && <ErrorMessage name="username" component="div" />}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="email" component="div" />}
                    error={!!values.email && <ErrorMessage name="email" component="div" />}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={<ErrorMessage name="password" component="div" />}
                    error={!!values.password && <ErrorMessage name="password" component="div" />}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ padding: '12px 0', marginTop: 2 }}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}
                  </Button>
                </Grid>
              </Grid>

              {message && (
                <Alert severity={message.includes('error') ? 'error' : 'success'} sx={{ marginTop: 2 }}>
                  {message}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Signup;
