
import NewBannerForm from '../components/creatBanner/NewBannerForm';
import { Grid, Paper, Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
// import UpImageBanner from '../components/creatBanner/UpImageBanner';



const product =  {
    id: "1",
    name: "Product 1",
    salePrice: 20,
    quantity: 50,
    description: "Description for Product 1",
    category: "Category 1",
    discountPercentage: 10,
    rating: 4.5,
    click: 100,
    coordinate: {
      longitude1: 34.7789,
      longitude2: 34.7890,
      longitude3: 34.7991,
      latitude1: 32.0678,
      latitude2: 32.0789,
      latitude3: 32.0900
    },
    image: {
      url: "http://localhost:5000/ford.png",
      alt: "Product 1 Image"
    }
  }

const CreateBanner = () => {
    const paperStyle = {
        padding: 20,
        margin: '0 auto',
        boxShadow: '0',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column', // Adjusted to column direction
    };

    const avatarStyle = { backgroundColor: 'green', marginBottom: '1rem' }; // Added margin-bottom

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '70vh',
                display: 'flex',
                '& .MuiPaper-root': {
                    // Adjust styles for the Paper component
                    ...paperStyle,
                },
            }}
        >

            <Paper elevation={10}>
                <Box sx={{ padding: '20px' }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Avatar style={avatarStyle}>
                                <EnhancedEncryptionIcon />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" gutterBottom>
                               creat new banner
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <NewBannerForm product={product} />
                </Box>
            </Paper>
                   
        </Grid>
    );
};

export default CreateBanner;
