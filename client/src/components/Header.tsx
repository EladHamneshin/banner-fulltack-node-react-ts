import { Box, Button, IconButton, Popover, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'; // Import HomeIcon
import { blue } from '@mui/material/colors';
import ManageIcon from './sidebar/ManageIcon';
import { useNavigate } from 'react-router-dom';
import SidBar from './sidebar/SidBar';

type Props = {}

const Header = (props: Props) => {

  const navigate = useNavigate();
  const handelClickLogin = () => { navigate(`/login`) }
  if (localStorage.getItem('token') === null) { handelClickLogin() }

  const handelClickHomePage = () => {
    navigate(`/deshbord `)
    // window.location.reload();
  }
  const storedUserName = localStorage.getItem('name');

  // Define a union type for UserName
  type UserNameType = 'User' | string | null;

  // Set the initial state based on the stored value or use 'User' as a fallback
  const initialUserName: UserNameType = storedUserName ? storedUserName : 'User';

  const [UserName, setUserName] = useState<UserNameType>(initialUserName);



  // const signOut = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('name');
  //   setUserName('User')
  // }
  // const ifUserIn = () => {
  //   return localStorage.getItem('token') !== null
  // }
  const theme = createTheme({
    palette: {
      primary: {
        light: blue[100],
        main: blue[500],
        dark: blue[700],
      },
    },
  });

  return (
    <Box sx={containerStyle}>


      <Box style={textBoxStyle}>
        Hello {UserName}
        <br />
        <ManageIcon />
      </Box>
      <ThemeProvider theme={theme}>
        <Box>
          <IconButton>
            <SidBar />
          </IconButton>
          <IconButton onClick={handelClickHomePage}>
            <HomeIcon

              sx={{
                bgcolor: `primary.light`,
                borderRadius: '50% '
              }} fontSize="large"
              color="primary" />
          </IconButton>
        </Box>
      </ThemeProvider>
    </Box>
  );
};
const containerStyle = {
  display: "flex",
  alignItems: "stretch",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  textAlign: "center",
  padding: "3px",
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
  padding: "0 10px 0 10px",
};
export default Header