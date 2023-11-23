import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllBannersImage } from '../api/bannersImageFunc'
import { ResponseBanner } from '../types/BannerInterface'


type Props = {}

const AllBanners = (props: Props) => {
    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllBannersImage();
                if (result.success === false) { return setMessage(result.message) }
                console.log('rrrrrrrrrrrrrrr', result);
                if (result.success === true) {
                    const data: ResponseBanner[] = result.data
                    console.log('ddddddddddd', data);
                    setBanners(data)
                }
            } catch (error) {
                console.log(error);
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
                        <Stack key={index}>{banner.name}</Stack>
                    ))}
                </>
            )}
        </Box>
    )
}

export default AllBanners