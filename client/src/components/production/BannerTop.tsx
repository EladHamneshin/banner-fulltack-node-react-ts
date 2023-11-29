import {useEffect,useState} from 'react'
import { Box, Button, Card } from '@mui/material';
import { BannerInterface } from '../../types/BannerInterface';
import { getBannerImageByParams } from '../../api/production/getBannerImage';

type Props = {
    size : string;
    limit ?: string;
    category ?: string
    userID ?: string
}
export default function BannerTop(props : Props) {
    const [banner, setBanner] = useState<BannerInterface| null>(null)

    const handelClickBanner = () => {
        setBanner(null);
    }

    async function getProducts() {
        let params = 'size=top&';
        if (props.limit) {params += 'limit=' + props.limit + '&'}
        if (props.category) {params += 'category=' + props.category + '&'}
        if (props.userID) {params += 'userID=' + props.userID + '&'}

        const response = await getBannerImageByParams(params)
        console.log(response);
        
        setBanner(response.data[0]);
    }

   useEffect(() => {
    getProducts()
   }, [])


  return (
    <>
    {banner ? <Card sx={{position:'fixed', bottom:0,left:'33%', zIndex:1000}}>

   <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
    <Button variant='text' onClick={handelClickBanner} color='warning' 
    sx={{position:'absolute', left:0,top:0, padding:0, margin:0, }}>x</Button>
    <img  src={banner?.image.url} alt={banner?.image.alt} style={{ height: '120px' }} />
</Box>

</Card> : <p> banner</p>}

</>  )
}