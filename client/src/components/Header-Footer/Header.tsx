import { Box, IconButton, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
// import HomeIcon from '@mui/icons-material/Home';
import { blue } from '@mui/material/colors';
import ManageIcon from '../ManageIcon';
import { useNavigate } from 'react-router-dom';
import SidBar from '../SidBar';


const Header = () => {

  const navigate = useNavigate();

  const handelClickHomePage = () => {
    navigate(localStorage.getItem('token') !== null ? `/banners/` : `/banners/login`)
  }
  const storedUserName = localStorage.getItem('name');

  // Define a union type for UserName
  type UserNameType = 'User' | string | null;

  // Set the initial state based on the stored value or use 'User' as a fallback
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
            <img src='\public\bannars-high-resolution-logo-transparent.png' alt='logo'
              height={'40px'}></img>
            {/* <HomeIcon

              sx={{
                bgcolor: `primary.light`,
                borderRadius: '50% '
              }} 
              fontSize="large"
              color="primary" /> */}
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
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  color: "white",
  padding: "0 10px 0 10px",
  alignItems: 'center'
};
export default Header