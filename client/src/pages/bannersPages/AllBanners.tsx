import { useEffect, useState } from 'react';
import { Box, Stack, ThemeProvider, Typography, createTheme, Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllBannersImage } from '../../api/banners/bannersImageFunc';
import CardBanner from '../../components/cards/CardBanner';
import { ResponseBanner } from '../../types/BannerInterface';
import BannerNotFind from './BannerNotFind';
import Circular from '../../components/Circular';

const AllBanners = () => {
    const [message, setMessage] = useState('');
    const [banners, setBanners] = useState<ResponseBanner[] | string | null>(null);
    const [loading, setLoading] = useState(true);
    const [triger, setTriger] = useState(true);

    const navigate = useNavigate();
    const handleLoginRedirect = () => navigate('/banner/login');

    useEffect(() => {
        if (localStorage.getItem('token') === null) handleLoginRedirect();
    }, []);

    const themeOptions = {
        palette: {
            primary: {
                main: '#03045e',
            },
            secondary: {
                main: '#4CAF50',
            },
            error: {
                main: '#FF5722',
            },
            text: {
                primary: '#212121',
            },
        },
        typography: {
            h2: {
                fontSize: '2.5rem',
                '@media (min-width:800px)': {
                    fontSize: '2.7rem',
                },
                '@media (min-width:960px)': {
                    fontSize: '2.8rem',
                },
            },
        },
    };
    const theme: Theme = createTheme(themeOptions);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllBannersImage();
                if (result.success === false) {
                    setMessage(result.message);
                } else if (result.success === true) {
                    const data: ResponseBanner[] = result.data;
                    setBanners(data.length === 0 ? 'There are no banners' : data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setMessage('no banners in DB');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [triger]);

    return (
        <Box>
            <ThemeProvider theme={theme}>
                <Typography variant="h2" sx={{
                    margin: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    color: theme.palette.primary.main,
                }}>All Banners</Typography>
            </ThemeProvider>
            <Box sx={{ width: '80vw' }}>
                {loading ? (
                    <Circular />
                ) : message ? (
                    <Typography variant="h3" sx={{ color: theme.palette.error.main }}>{message}</Typography>
                ) : banners === null ? (
                    <Typography variant="h3">Loading...</Typography>
                ) : typeof banners === 'string' ? (
                    <BannerNotFind />
                ) : (
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'
                    }}>
                        {banners.map((banner, index) => (
                            <Stack key={index} sx={{ width: '250px' }}>
                                <CardBanner
                                    banner={banner}
                                    triger={{
                                        triger: triger,
                                        trigerSet: setTriger
                                    }} />
                            </Stack>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default AllBanners;
