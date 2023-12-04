
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { bannerByProducdID } from '../../api/banners/bannerByProducdID'
import { ResponseBanner } from '../../types/BannerInterface'
import { useNavigate, useParams } from 'react-router-dom'
import CardBanner from '../../components/cards/CardBanner'

const BannersByProductID = () => {

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/banner/login`) }
    useEffect(() => {
        if (localStorage.getItem('token') === null) { handelClickLogin() }
    }, [])

    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[] | string>([]);
    const { productID } = useParams()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await bannerByProducdID(productID!);

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



export default BannersByProductID