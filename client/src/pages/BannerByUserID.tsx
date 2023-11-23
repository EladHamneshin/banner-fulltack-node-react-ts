import React, { useEffect, useState } from 'react'
import { bannerByUserID } from '../api/bannerByUserID'
import { Box, Stack } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import CardBanner from '../components/CardBanner'
import { ResponseBanner } from '../types/BannerInterface'
import { exmpleBanner } from '../exmpleBanners'
import { Typography } from '@mui/material'


const BannerByUserID = () => {

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/login`) }
    if (localStorage.getItem('token') === null) { handelClickLogin() }

    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[] | string>([]);
    const userID = localStorage.getItem('userID')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await bannerByUserID(userID!);
                if (result.success === false) { return setMessage(result.message) }
                if (result.success === true) {
                    const data: ResponseBanner[] = result.data
                    data.length === 0 ? setBanners('There are no banners on your name') : setBanners(data)
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
                <> {typeof banners === 'string' ? (
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

export default BannerByUserID

function ifUserIn() {
    throw new Error('Function not implemented.')
}
