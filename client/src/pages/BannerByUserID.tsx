import React, { useEffect, useState } from 'react'
import { bannerByUserID } from '../api/bannerByUserID'
import { Box, Stack } from '@mui/system'
import { useParams } from 'react-router-dom'
import CardBanner from '../components/CardBanner'
import { ResponseBanner } from '../types/BannerInterface'
import { exmpleBanner } from '../exmpleBanners'


const BannerByUserID = () => {
    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[]>([]);
    const { userID } = useParams()
    // console.log('uuuuuuuu', useParams());

    // console.log('lllllllllllllllll', userID);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await bannerByUserID(userID!);

                // console.log('rrrrrrrrrrrrrrr', result);
                if (result.success === false) { return setMessage(result.message) }
                if (result.success === true) {
                    const data: ResponseBanner[] = result.data
                    // console.log('ddddddddddd', data);
                    data.length === 0 ? setBanners(exmpleBanner) : setBanners(data)
                }
            } catch (error) {
                // console.log(error);
            }
        };

        fetchData();

        //   return () => {

        //   }
    }, []);


    return (
        <Box>
            {message ? (
                <Stack>{message}</Stack>
            ) : (
                <>
                    {banners.map((banner, index) => (
                        <Stack key={index}><CardBanner banner={banner} /></Stack>
                    ))}
                </>
            )}
        </Box>
    )
}

export default BannerByUserID