import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllBannersImage } from '../api/banners/bannersImageFunc'
import { ResponseBanner } from '../types/BannerInterface'
import CardBanner from '../components/CardBanner'
import { exmpleBanner } from '../exmpleBanners'

import { useNavigate } from 'react-router-dom'




const AllBanners = () => {
    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[]>([]);

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/login`) }
    if (localStorage.getItem('token') === null) { handelClickLogin() }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllBannersImage();
                if (result.success === false) { return setMessage(result.message) }
                console.log('rrrrrrrrrrrrrrr', result);
                if (result.success === true) {
                    const data: ResponseBanner[] = result.data
                    console.log('ddddddddddd', data);
                    data.length === 0 ? setBanners(exmpleBanner) : setBanners(data)
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
                    {banners.map((banner, index) => (
                        <Stack key={index}><CardBanner banner={banner} /></Stack>
                    ))}
                </>
            )}
        </Box>
    )
}

export default AllBanners