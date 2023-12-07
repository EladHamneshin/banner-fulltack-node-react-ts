import { Box } from '@mui/material'
import { useEffect } from 'react'
import Header from '../components/Header-Footer/Header';
import Footer from '../components/Header-Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

const styleContainer = {
  height: '99%',
  width: '99%',
  display: 'flex',
  flexDirection: 'column',
  margin: '0'
};

const styleHeaderBox = {
  order: 1,
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '60px',
  zIndex: '5000'
};

const styleMainBox = {
  flexDirection: 'row',
  marginLeft: '90px',
  marginRight: '50px',
  order: 2,
  flexGrow: 1,
  padding: '10px',
  display: 'flex',
  marginTop: '60px',
  marginBottom: '120px',
  maxWidth: '70wh',
};

const styleFooterBox = {
  marginBottom: '60px',
  order: 1,
  position: 'fixed',
  bottom: 2,
  width: '100%',
  height: '10px'
};

const Deshbord = () => {
  const navigate = useNavigate();
  const handelClickLogin = () => navigate(`/banner/login`)
  useEffect(() => {
    if (localStorage.getItem('token') === null) { handelClickLogin() }
  }, [])

  return (
    <Box sx={styleContainer}>
      <Box sx={{ ...styleHeaderBox, }}>
        <Header />
      </Box>
      <Box sx={{...styleMainBox,display:'flex',justifyContent:'center'}}>
        <Outlet />
      </Box>
      <Box sx={styleFooterBox}>
        <Footer />
      </Box>
    </Box>
  )
}

export default Deshbord