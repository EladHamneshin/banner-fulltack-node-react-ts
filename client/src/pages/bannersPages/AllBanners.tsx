import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllBannersImage } from '../../api/banners/bannersImageFunc'
import { ResponseBanner } from '../../types/BannerInterface'
import CardBanner from '../../components/cards/CardBanner'
import { useNavigate } from 'react-router-dom'




const AllBanners = () => {
    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[] | string>([]);

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`login`) }
    useEffect(() => {
        if (localStorage.getItem('token') === null) { handelClickLogin() }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllBannersImage();
                if (result.success === false) { return setMessage(result.message) }
                if (result.success === true) {
                    const data: ResponseBanner[] = result.data
                    data.length === 0 ? setBanners('There is no such producrID') : setBanners(data)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (
        <Box>
            {message ? (
                <Stack>{message}</Stack>
            ) : (
                <>

                    {typeof banners === 'string' ? (
                        <Typography variant='h3'>{banners}</Typography>
                    ) : (
                        banners.map((banner, index) => (
                            <Stack key={index}><CardBanner banner={banner} /></Stack>
                        ))
                    )}

                </>
            )}
        </Box>
    )
}

export default AllBanners