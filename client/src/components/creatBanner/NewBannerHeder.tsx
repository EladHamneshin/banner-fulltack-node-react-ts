import { useState } from 'react';
import { Box } from '@mui/material';
import { Product } from '../../types/ProductInterface';

import { useNavigate } from 'react-router-dom';
import CardProduct from '../cards/CardProduct';
import { createBanner } from '../../api/banners/createNewBanner';
import AddBannerForm from './AddBannerForm';
import resizeImage from '../../utils/resizeImage';
import { uploadImageToServer } from '../../api/banners/uploadImage';
import AppKaka from '../../kaka/CropKaka/AppKaka';

const API_URI = import.meta.env.VITE_API_URI

type Props = {
    product: Product
}

const NewBannerForm = (props: Props) => {

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/login`) }
    if (localStorage.getItem('token') === null) { handelClickLogin() }

    const product = props.product

    // const [message] = useState('');
    // const [loading, setLoading] = useState(false);

    const [imageUrl, setImage] = useState("");


    const uploadImage = async (image: File, name : string , size : string) => {
        let width = 750
        let height = 550
        if (size === 'side'){
            width = 120
            height = 650
        } else if (size === 'top'){
            width = 770
            height = 150
        }   
        const getresizeImage = await resizeImage(image, width, height);

        const FileName = name + size
        const cleanFileName = FileName.replace(/[^a-zA-Z0-9]/g, '')
        const blob = new Blob([getresizeImage], { type: 'image/jpeg' });

        const file = new File([blob], `${cleanFileName}.jpg`);
        const resUrl = await uploadImageToServer(file)
        console.log(resUrl);

       

        setImage(`${API_URI}/images/${cleanFileName}.jpg`)
        console.log(imageUrl);

    }


    const onSubmitForm = async (data : any) => {

        const FileName = product.name + product.category + data.size
        const cleanFileName = FileName.replace(/[^a-zA-Z0-9]/g, '')
        const newBanner = {
            name: product.name + product.category,
            catogryName: product.category,
            clickCount: 0,
            image: {
                url: `${API_URI}/images/${cleanFileName}.jpg`,
                alt: product.name
            },
            size: data.size,
            kind: [data.kind],
            text: data.text,
            // createdAt: Date.now(),
            author: 'admin',
        }
        await createBanner(newBanner, product.id);

    };
    






    return (
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-around', width: '95vw' }}>
            <AddBannerForm
                onSubmitForm={onSubmitForm}
                uploadImage={uploadImage}
                product={product} />
            <Box>
                {imageUrl ? <img src={imageUrl} width="100%" alt='fff'></img>
                    :
                <AppKaka />}
            </Box>
            <Box>
                <CardProduct product={product} />
            </Box>

        </Box>
    );
};

export default NewBannerForm;
