import React, { useState, useEffect } from 'react'
import { Button, Container, Typography } from '@mui/material'
import axios from 'axios';

const Welcome = () => {
  const [details, setDetails] = useState([]);
  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get('http://localhost:5000/details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDetails(res.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (details.length) {
      console.log(details, "details (after state update)");
    }
  }, [details]);

  return (
    <Container maxWidth="sm" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      color: '#333',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Typography variant="h2" textAlign={'center'} gutterBottom>Welcome to Our Application</Typography>
      <Typography variant="body1" paragraph>We're glad to have you here. Explore and enjoy!</Typography>
      {details.user && (
  <div style={{ marginTop: '20px' }}>
    <Typography variant="h6">Name: {details.user.name}</Typography>
    <Typography variant="h6">Email: {details.user.email}</Typography>
  </div>
)}
      <Button variant="contained" color="primary" onClick={fetchUserDetails}>Get Started</Button>
    </Container>
  )
}

export default Welcome