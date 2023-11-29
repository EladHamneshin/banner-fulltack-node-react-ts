import {useEffect,useState} from 'react'
import { Box, Card } from '@mui/material';
import { BannerInterface } from '../../types/BannerInterface';




export default function BannerTop() {
    const [banner, setBanner] = useState<BannerInterface>()

    async function getProducts() {
        const response = await fetch('http://localhost:3000/bannerTop');
        const data = await response.json();
        setBanner(data);
    }

   useEffect(() => {
    getProducts()
   }, [])


  return (
    <>
    <Card sx={{margin:2, padding:1}}>
   <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
    <img src={banner?.image.url} alt={banner?.image.alt} style={{ width: '100px' }} />

</Box>
</Card>

</>  )
}