import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bannerByUserID } from "../../api/banners/bannerByUserID";
import CardBanner from "../../components/cards/CardBanner";
import BannerNotFind from "./BannerNotFind";
import Circular from "../../components/Circular";
import { ResponseBanner } from "../../types/BannerInterface";

const BannerByUserID = () => {
    const navigate = useNavigate();
    const handleClickLogin = () => navigate('/banner/login');

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handleClickLogin();
        }
    }, []);

    const [banners, setBanners] = useState<ResponseBanner[] | string>([]);
    const userID = localStorage.getItem('userID');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userID !== null) {
                    const result = await bannerByUserID(userID);

                    if (result.success === false) {
                        setBanners(result.message);
                    } else if (result.success === true) {
                        const data: ResponseBanner[] = result.data;
                        setBanners(data.length === 0 ? '' : data);
                    }
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setBanners('Error fetching banners');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userID]);

    return (
        <Box>
            {loading ? (
                <Stack justifyContent="center" alignItems="center" height="100vh">
                    <Circular />
                </Stack>
            ) : (
                <Stack spacing={2}>
                    {typeof banners === 'string' ? (
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
                                    <CardBanner banner={banner}  />
                                </Stack>
                            ))}
                        </Box>
                    )}
                </Stack>
            )}
        </Box>
    );
};

export default BannerByUserID;
