import React, { useState } from 'react';
import { Box, Badge, BadgeProps, Button, IconButton, styled, Link } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon



const StatusLogsAndCart = () => {

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }

  return (
    <Box sx={containerStyle}>
      <Box style={textBoxStyle}>
        Hello Guest
        <br />
      </Box>

      <Box style={textBoxStyle}>
        Hello User
        <br />
        <Button
          style={iconButtonStyle}
          onClick={() => signOut()}
        >Sign out</Button>
      </Box>
      <Box>
        <HomeIcon fontSize="large" />
      </Box>
    </Box>
  );
};
const containerStyle = {
  display: "flex",
  alignItems: "stretch",
  flexDirection: "row",
  justifyContent: "space-between",
  textAlign: "center",
  padding: "20px",
  background: "#09056A",
};
const iconButtonStyle = {
  color: 'white',
  cursor: 'pointer'
};
const textBoxStyle = {
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  color: "white",
  padding: "5px",
};
export default StatusLogsAndCart;

