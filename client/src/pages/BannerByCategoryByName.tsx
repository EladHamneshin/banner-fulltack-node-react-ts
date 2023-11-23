import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bannerByCategoryByName } from '../api/bannerByCategoryByName'
import { ResponseBanner } from '../types/BannerInterface'
import CardBanner from '../components/CardBanner'
import { exmpleBanner } from '../exmpleBanners'

type Props = {}

const BannerByCategoryByName = (props: Props) => {
    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[]>([]);
    const { name } = useParams()
    // console.log('uuuuuuuu', useParams());

    // console.log('lllllllllllllllll', name);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await bannerByCategoryByName(name!);

                // console.log('rrrrrrrrrrrrrrr', result);
                if (result.success === false) { return setMessage(result.message) }
                if (result.success === true) {
                    const data: ResponseBanner[] = result.data
                    // console.log('ddddddddddd', data);
                    data.length === 0 ? setBanners(exmpleBanner) : setBanners(data)
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
                        <Stack key={index}><CardBanner banner={banner} /></Stack>
                    ))}
                </>
            )}
        </Box>
    )
}

export default BannerByCategoryByName