import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#496178', // Change this to your desired background color
        color: '#FFFFFF', // Change this to your desired text color
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Banners Website Footer.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'Copyright © '}
          <Link color="inherit" href="/" underline="none">
            Banners Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
