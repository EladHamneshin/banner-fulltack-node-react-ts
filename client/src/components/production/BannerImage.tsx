import { useEffect, useState } from 'react'
import { Box, Button, Card } from '@mui/material';
import { BannerInterface } from '../../types/BannerInterface';
import { getBannerImageByParams } from '../../api/production/getBannerImage';

type Props = {
    limit?: string;
    size: string;
    category?: string
    userID?: string
}
export default function BannerSide(props: Props) {
    const styleTop = { position: 'fixed', bottom: 0, left: '10%', height: '150px', zIndex: 1000 }
    const styleSide = { position: 'fixed', height: '500px', left: 0, top: 75, zIndex: 1000 }
    const [style, setstyle] = useState<any>(styleSide)
    const [banner, setBanner] = useState<BannerInterface | null>(null)

    const handelClickBanner = () => {
        setBanner(null);
        if (props.size === 'side') {
            setTimeout(() => {
                getProducts()
            }, 10000)
        }
    }
    async function getProducts() {
        let params = '';
        if (props.limit) { params += 'limit=' + props.limit + '&' }
        if (props.category) { params += 'category=' + props.category + '&' }
        if (props.size) { params += 'size=' + props.size + '&' }
        if (props.userID) { params += 'userID=' + props.userID + '&' }
        if (props.size === 'top') { setstyle(styleTop) }
        const response = await getBannerImageByParams(params)
        setBanner(response.data[0]);
    }

    useEffect(() => {
        setTimeout(() => {
            getProducts()
        }, 2000)
    }, [])

    return (
        <>
            {banner && <Card sx={{ ...style, }}>
                <Button variant='text' onClick={handelClickBanner} color='warning'
                    sx={{ position: 'absolute', left: 0, top: 0, padding: 0, margin: 0, }}>x</Button>

                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                    <img src={banner?.image.url} alt={banner?.image.alt} />
                </Box>
            </Card>}
        </>
    )
}