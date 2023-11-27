import { CircularProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bannerByUserID } from "../../api/banners/bannerByUserID";
import CardBanner from "../../components/cards/CardBanner";
import { ResponseBanner } from "../../types/BannerInterface";
import BannerNotFind from "./BannerNotFind";

const BannerByUserID = () => {
    const navigate = useNavigate();
    const handleClickLogin = () => {
        navigate('login');
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handleClickLogin();
        }
    }, []);

    const [message, setMessage] = useState('');
    const [banners, setBanners] = useState<ResponseBanner[] | string>([]);
    const userID = localStorage.getItem('userID');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userID !== null) {
                    const result = await bannerByUserID(userID);

                    if (result.success === false) {
                        setMessage(result.message);
                    } else if (result.success === true) {
                        const data: ResponseBanner[] = result.data;
                        setBanners(data.length === 0 ? '' : data);
                    }
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setMessage('Error fetching banners');
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
                    <CircularProgress />
                </Stack>
            ) : message ? (
                <Stack>
                    <Typography variant="h3" textAlign="center" color="error">{message}</Typography>
                </Stack>
            ) : (
                <Stack spacing={2}>
                    {typeof banners === 'string' ? (<Box>
                        {/* <Typography variant="h3" textAlign="center">{banners}</Typography> */}
                        <BannerNotFind />

                    </Box>
                    ) : (
                        banners.map((banner, index) => (
                            <CardBanner key={index} banner={banner} />
                        ))
                    )}
                </Stack>
            )}
        </Box>
    );
};

export default BannerByUserID;
