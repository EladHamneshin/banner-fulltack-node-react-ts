import { Box } from '@mui/material'
import { useEffect} from 'react'
import Header from '../components/Header-Footer/Header';
import Footer from '../components/Header-Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';




const styleContainer = {
  height: '99%',
  width: '99%',
  display: 'flex',
  flexDirection: 'column',
  
};

const styleHeaderBox = {
  order: 1,
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '60px',
  zIndex:'5000'
};

const styleMainBox = {
  marginLeft: '120px',
  marginRight: '120px',
  // marginTop: '120px',
  order: 2,
  flexGrow: 1,
  padding: '10px',
  display: 'flex',
  marginTop: '60px',
  // marginBottom: '60px',
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
  const handelClickLogin = () => { navigate(`/banners/login`) }
  useEffect(() => {
    if (localStorage.getItem('token') === null) { handelClickLogin() }

  }, [])

  return (
    <Box sx={styleContainer}>
   
      <Box sx={{ ...styleHeaderBox, }}>
        <Header />
      </Box>
      <Box sx={{ ...styleMainBox, flexDirection: 'row', }}>
        <Box sx={{ flexGrow: 1, }}>
          <Outlet />
        </Box>
      </Box>
      <Box sx={{ ...styleFooterBox, }}>
        <Footer />
      </Box>
    </Box>
  )
}

export default Deshbord