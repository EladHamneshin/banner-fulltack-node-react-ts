import { useEffect, useState } from 'react';
import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllBannersImage } from '../../api/banners/bannersImageFunc';
import CardBanner from '../../components/cards/CardBanner';
import { ResponseBanner } from '../../types/BannerInterface';
import BannerNotFind from './BannerNotFind';

const AllBanners = () => {
    const [message, setMessage] = useState('');
    const [banners, setBanners] = useState<ResponseBanner[] | string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

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
                    setBanners(data.length === 0 ? 'There are no banners' : data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setMessage('Error fetching banners');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Box>
            {loading ? (
                <CircularProgress />
            ) : message ? (
                <Stack>
                    <Typography variant="h3">{message}</Typography>
                </Stack>
            ) : banners === null ? (
                <Typography variant="h3">Loading...</Typography>
            ) : typeof banners === 'string' ? (
                // <Typography variant="h3">{banners}</Typography>
                <BannerNotFind />
            ) : (
                banners.map((banner, index) => (
                    <Stack key={index} spacing={2}>
                        <CardBanner banner={banner} />
                    </Stack>
                ))
            )}
        </Box>
    );
};

export default AllBanners;
