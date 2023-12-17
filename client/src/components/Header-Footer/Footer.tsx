import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
         mt: 'auto',
         backgroundColor: '#496178',
         color: '#FFFFFF',display:'flex'
        }}
    >
      <Container
       maxWidth="sm"
       sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
      }}>
        <Typography variant="body1">
          Banners Website Footer.
        </Typography>
        <Typography variant="body2" color="#FFFFFF">
          {'Copyright © '}
        </Typography>
        <Typography variant="body2" color="#FFFFFF">
          <Link color="inherit" href="/" underline="none">
            Banners Website
          {' '}
          {new Date().getFullYear()}
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
