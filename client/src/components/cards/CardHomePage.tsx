import { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, useTheme } from '@mui/material';
import { ResponseBanner } from '../../types/BannerInterface';
import { useNavigate } from 'react-router-dom';

type Props = {
    banner: ResponseBanner;
};

const CardHomePage: React.FC<Props> = ({ banner }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const handleClickLogin = () => navigate('login');

    const handleClickCardProduct = () => navigate(`/banner/banners/ProductPage/${banner.productID}`);

    useEffect(() => {
        if (localStorage.getItem('token') === null) handleClickLogin();
    }, []);

    return (
        <Box onClick={handleClickCardProduct}>
            <Card
                sx={{
                    height: '270px',
                    width: '170px',
                    margin: '30px',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s',
                    background: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s',
                        boxShadow: theme.shadows[3],
                    },
                }}
            >
                <CardMedia
                    component="img"
                    height="70"
                    image={banner.image.url}
                    alt={banner.image.alt}
                    sx={{ borderRadius: `${theme.shape.borderRadius} ${theme.shape.borderRadius} 0 0` }}
                />
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ margin: '4px', color: theme.palette.primary.main }}>
                        {banner.name}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ margin: '4px', color: theme.palette.text.secondary }}>
                        author: {banner.author}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ margin: '4px', color: theme.palette.text.secondary }}>
                        createdAt: {banner.createdAt}
                    </Typography>
                </CardContent>
                <Box sx={{ marginTop: 'auto', textAlign: 'center' }}>
                    <Button variant="contained" color="primary" sx={{ margin: '8px' }}>
                        View Details
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default CardHomePage;
