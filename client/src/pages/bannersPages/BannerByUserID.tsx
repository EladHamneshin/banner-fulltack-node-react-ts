import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bannerByUserID } from "../../api/banners/bannerByUserID";
import CardBanner from "../../components/cards/CardBanner";
import { ResponseBanner } from "../../types/BannerInterface";
import BannerNotFind from "./BannerNotFind";
import Circular from "../../components/Circular";

const BannerByUserID = () => {
    const navigate = useNavigate();
    const handleClickLogin = () => {
        navigate('/banner/login');
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handleClickLogin();
        }
    }, []);

    const [, setMessage] = useState('');
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
                setBanners('')
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
                        <Box>
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
