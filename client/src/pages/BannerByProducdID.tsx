import { Box, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { bannerByProducdID } from '../api/bannerByProducdID'
import { ResponseBanner } from '../types/BannerInterface'
import { useParams } from 'react-router-dom'
import { exmpleBanner } from '../exmpleBanners'

type Props = {}

const BannersByProductID = (props: Props) => {
    const [message, setMessage] = useState('')
    const [banners, setBanners] = useState<ResponseBanner[]>([]);
    const { productID } = useParams()

    // console.log('lllllllllllllllll', productID);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await bannerByProducdID(productID!);

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
                        <Stack key={index}>{banner.name}</Stack>
                    ))}
                </>
            )}
        </Box>
    )
}



export default BannersByProductID