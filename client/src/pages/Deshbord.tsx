import { Box } from '@mui/material'
import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';


const styleContainer = {
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateAreas:
    "'header header header' \
    'sideBar main main' \
    'footer footer footer'",
    gridTemplateRows: '8vh 80vh 6vh', // שינוי כאן - שורת הכותרת העליונה והתחתונה יהיו בגובה אוטומטי
  gridTemplateColumns: '15% 1fr 15%',
  gridGap: '4px',
};

const styleHeaderBox = {
  position: 'sticky',
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'inherit',
  zIndex: 1000,
};

const styleMainBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  
  flexWrap: 'wrap',
  paddingBottom: '60px', // שינוי כאן - כדי להשאיר מקום לכותרת התחתונה
  width: '100%',
};

const styleFooterBox = {
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'inherit',
  // maxWidth: '1280px', // כנראה שזה לא נחוץ
  height: '30px',
};

type Props = {

}

const Deshbord = (props: Props) => {
  return (
    <Box sx={styleContainer}>

      <Box sx={{ ...styleHeaderBox,border:'1px solid black', gridArea: 'header' }}>
        <Header />
      </Box>

      <Box sx={{ ...styleMainBox, border:'1px solid black', gridArea: 'main', flex: 1, }}>
     
        <Outlet/>
      </Box>
      <Box sx={{ border:'1px solid black', gridArea: 'sideBar' }}>
        <Footer />
      </Box>

      <Box sx={{ ...styleFooterBox, border:'1px solid black', gridArea: 'footer' }}>
        <Footer />
      </Box>

  </Box>
  )
}

export default Deshbord