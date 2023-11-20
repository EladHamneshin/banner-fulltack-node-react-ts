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
    gridTemplateRows: '90px 1fr 70px',
    gridTemplateColumns: '15% 1fr 15%',
    gridGap: '4px'
  };

  const styleHeaderBox = {
    display: 'block',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    width: 'inherit',
    marginTop: '0px',
    // background: '#7a9cc6',
    // maxWidth: '1280px',
    zIndex: 1000
  }

  const styleMainBox = {
    // background: '#9fbbcc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: '90px',
    width: '100%',
    // height: 'inherit',
    // overflowY: 'auto' // זה מאפשר גלילה אנכית
  };


  const styleFooterBox = {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    width: 'inherit',
    bottom: '0',
    // background: '#7a9cc6',
    color: 'gold',
    // maxWidth: '1280px',
    height: '60px'

  }

type Props = {

}

const Deshbord = (props: Props) => {
  return (
    <Box sx={styleContainer}>

      <Box sx={{ ...styleHeaderBox,border:'1px solid black', gridArea: 'header' }}>
        <Header />
      </Box>

      <Box sx={{ ...styleMainBox, border:'1px solid black', gridArea: 'main' }}>
     
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