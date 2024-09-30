import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Alert, CircularProgress, Grid } from '@mui/material';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = ({ setIsLoggedIn }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email: values.email,
        password: values.password,
      });

      setMessage(response.data.message);
      setIsLoggedIn(true); 
      navigate('/products'); 
    } catch (error) {
      setMessage(error.response.data.error);
      setIsLoggedIn(false);
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: '400px',
          margin: '100px auto',
          
          padding: 3,
          boxShadow: 3, 
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, values, handleChange, handleBlur }) => (
            <Form noValidate>
              <Grid container spacing={3}>
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
                    {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
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

export default Login;
