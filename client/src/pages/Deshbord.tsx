import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';



const styleContainer = {
  height: '99%',
  width: '99%',
  display: 'flex',
  flexDirection: 'column'
};

const styleHeaderBox = {
  order: 1,
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '60px'
};

const styleMainBox = {
  order: 2,
  flexGrow: 1,
  padding: '10px',
  display: 'flex',
  marginTop: '60px',
  marginBottom: '60px',
  width: '100vw',
};

const styleFooterBox = {
  order: 3,
  position: 'fixed',
  bottom: 2,
  width: '100%',
  height: '30px'
};

type Props = {

}

const Deshbord = (props: Props) => {
  const [openSidebar, setOpenSidebar] = useState(true);



  return (
    <Box sx={styleContainer}>

      <Box sx={{ ...styleHeaderBox, border: '1px solid black' }}>
        <Header />
      </Box>
      <Box sx={{ ...styleMainBox, flexDirection: 'row', border: '1px solid black' }}>

        <Box sx={{ border: '1px solid black' }}>
          <IconButton onClick={() => setOpenSidebar(!openSidebar)}>
            {openSidebar ? <MenuOpenOutlinedIcon /> : <MenuOpenOutlinedIcon sx={{ transform: 'rotateY(180deg)' }} />}
          </IconButton>
          {openSidebar && <p>sid bar </p>}
        </Box>


        <Box sx={{ flexGrow: 1, border: '1px solid black' }}>
          <Outlet />
          Box</Box>
      </Box>
      <Box sx={{ ...styleFooterBox, border: '1px solid black' }}>
        <Footer />
      </Box>

    </Box>
  )
}

export default Deshbord