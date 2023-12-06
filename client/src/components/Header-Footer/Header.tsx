import { Box, IconButton, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import { blue } from '@mui/material/colors';
import ManageIcon from '../ManageIcon';
import { useNavigate } from 'react-router-dom';
import SidBar from '../SidBar';

const Header = () => {

  const navigate = useNavigate();

  const handelClickHomePage = () => {
    navigate(localStorage.getItem('token') !== null ? `/banner/` : `/banner/login`)
  }
  const storedUserName = localStorage.getItem('name');

  type UserNameType = 'User' | string | null;

  const initialUserName: UserNameType = storedUserName ? storedUserName : 'User';

  const [UserName] = useState<UserNameType>(initialUserName);

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
            <img src='\public\logo.svg' alt='logo'
              height={'40px'}></img>
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
  background: "#5a54e9",
};

const textBoxStyle = {
  display: 'flex',
  padding: ' 0px 25px',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  color: "white"
};

export default Header