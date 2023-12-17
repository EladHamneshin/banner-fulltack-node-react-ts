import { useEffect, useState } from 'react';
import { Box, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ResponseBanner } from '../../types/BannerInterface';
import BannerNotFind from './BannerNotFind';
import CardHomePage from '../../components/cards/CardHomePage';
import { getAllBannersImage } from '../../api/banners/bannersImageFunc';
import Circular from '../../components/Circular';

const AllbannersHomePage = () => {
    const [message, setMessage] = useState('');
    const [banners, setBanners] = useState<ResponseBanner[] | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLoginRedirect = () => navigate('/banner/login')

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handleLoginRedirect();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllBannersImage();
                if (result.success === false) {
                    setMessage(result.message);
                } else if (result.success === true) {
                    const data: ResponseBanner[] = result.data;
                    setBanners(data.length === 0 ? [] : data.slice(0, 5));
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setMessage('no banners in DB');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const theme = createTheme();

    theme.typography.h2 = {
        fontSize: '2rem',
        '@media (min-width:600px)': {
            fontSize: '2.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.5rem',
        },
    };

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Typography
                    variant="h2"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '10px'
                    }}>
                    Top 5 Banners
                </Typography>
            </ThemeProvider>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {loading ? (
                    <Circular />
                ) : message ? (
                    <Stack>
                        <Typography variant="h3">{message}</Typography>
                    </Stack>
                ) : banners === null ? (
                    <Typography variant="h3">Loading...</Typography>
                ) : typeof banners === 'string' ? (
                    <BannerNotFind />
                ) : (
                    banners.map((banner, index) => (
                        <Stack key={index} sx={{ cursor: 'pointer', width: '200px', margin: '30px' }}>
                            <CardHomePage banner={banner} />
                        </Stack>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default AllbannersHomePage;
