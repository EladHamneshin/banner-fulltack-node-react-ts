
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { bannerByCategoryByName } from '../api/bannerByCategoryByName'
import { ResponseBanner } from '../types/BannerInterface'
import CardBanner from '../components/CardBanner'


type Props = {}

const BannerByCategoryByName = (props: Props) => {

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/login`) }
    if (localStorage.getItem('token') === null) { handelClickLogin() }

    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[] | string>([]);
    const { name } = useParams()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await bannerByCategoryByName(name!);


                if (result.success === false) { return setMessage(result.message) }
                if (result.success === true) {
                    const data: ResponseBanner[] = result.data
                    data.length === 0 ? setBanners('There is no such category name') : setBanners(data)

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
                        <Typography variant='h2'>{banners}</Typography>
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

export default BannerByCategoryByName