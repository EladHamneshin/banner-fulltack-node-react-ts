import { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ResponseBanner } from '../../types/BannerInterface';
import { useNavigate } from 'react-router-dom';

type Props = {
    banner: ResponseBanner
}

const CardHomePage = (props: Props) => {
    const { banner } = props;
    const navigate = useNavigate();
    const handelClickLogin = () => navigate('login');
    const handelClickCardProduct = () => navigate(`/banner/ProductPage/${banner.productID}`);
    // {`/banners/ProductPage/${banner.productID}`} 
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handelClickLogin();
        }
    }, []);


    return (
        <Box onClick={handelClickCardProduct}>
            <Card
            
                sx={{
                    height: '270px',
                     width: '80%', 
                    margin: '5px',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 8px rgba(0, 0, 0.9, 0.8)',
                    transition: 'transform 0.3s',
                    background: '#f0f0f0'
                }}
            >
                <CardMedia
                    component="img"
                    height="70"
                    image={banner.image.url}
                    alt={banner.image.alt}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{margin:'4px'}}>
                        {banner.name}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{margin:'4px'}}>
                        {banner.author}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{margin:'4px'}} >
                        {banner.createdAt}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CardHomePage;
