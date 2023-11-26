import { useState } from 'react';
import { Button, TextField, Box, Grid, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from '../../types/ProductInterface';
import { v4 as uuid } from 'uuid'

import { useNavigate } from 'react-router-dom';
import CardProduct from '../cards/CardProduct';
import { uploadImageANDcreateBanner } from '../../api/banners/creatNewBanner';


const schema = yup.object({
    name: yup.string().max(20).required(),
    size: yup.string().oneOf(['side', 'top', 'all']).required(),
    // click: yup.number().default(0).required(),
    image: yup.mixed().required("Please upload an image"),
    // image_alt: yup.string().required(),
    kind: yup.string().oneOf(['price', 'sale']).required(),
    text: yup.string().max(20).required(),
    // createdAt: yup.date().required(),
    // author: yup.string().required(),
}).required();

type Props = {
    product: Product
}

const NewBannerForm = (props: Props) => {

    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`/login`) }
    if (localStorage.getItem('token') === null) { handelClickLogin() }

    const product = props.product
    const [message] = useState('');
    const [loading, setLoading] = useState(false);

    const [image] = useState("");


    const textFieldStyle = { padding: '2px', margin: '4px auto ' };

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log(data);
        const newBanner = {
            name: product.name,
            productID: product.id,
            catogryID: product.category,
            click: 0,
            image: {
                url: data.image[0],
                alt: product.name
            },
            size: data.size,
            kind: data.kind,
            text: data.text,
            createdAt: Date.now(),
            author: 'admin',
        }
        setLoading(true);
        uploadImageANDcreateBanner(newBanner);


        // setImage(data.image[0])
    };




    return (
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-around', width: '95vw' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {loading ?
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            minWidth: '420px',
                            minHeight: '360px',
                        }}
                    >
                        <Grid
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography>Loding.....</Typography>
                            {message && <Typography>{message}</Typography>}
                        </Grid>
                    </Box>
                    :
                    <Grid>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>


                            <Grid key={uuid()} sx={{ display: 'flex', flexDirection: 'column', }}>


                                <TextField style={textFieldStyle} label="Name" defaultValue={product.name}
                                    {...register("name", { required: true, maxLength: 20 })} />
                                <Typography color='red' variant='caption'> {errors.name?.message} </Typography>

                                <TextField style={textFieldStyle} label="Discription" placeholder="Discription"
                                    {...register("text", { required: true, maxLength: 20 })} />
                                <Typography color='red' variant='caption'> {errors.text?.message} </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Box>

                                        <InputLabel htmlFor="size">Select size</InputLabel>
                                        <Select
                                            style={textFieldStyle}
                                            label="size"
                                            defaultValue="side"
                                            {...register("size", { required: true })}
                                        >
                                            <MenuItem value="all">ALL</MenuItem>
                                            <MenuItem value="side">SIDE</MenuItem>
                                            <MenuItem value="top">TOP</MenuItem>
                                        </Select>
                                        <Typography color='red' variant='caption'>{errors.size?.message}</Typography>
                                    </Box>

                                    <Box>

                                        <InputLabel htmlFor="kind">Select kind</InputLabel>
                                        <Select
                                            style={textFieldStyle}
                                            label="kind"
                                            defaultValue="price"
                                            {...register("kind", { required: true })}
                                        >
                                            <MenuItem value="price">price</MenuItem>
                                            <MenuItem value="saile">saile</MenuItem>
                                        </Select>
                                        <Typography color='red' variant='caption'>{errors.kind?.message}</Typography>
                                    </Box>

                                </Box>
                                <TextField
                                    style={textFieldStyle}
                                    type="file"
                                    label="Image"
                                    {...register("image")}
                                    inputProps={{
                                        accept: "image/*",
                                    }}
                                //    onChange={getImageFile} 
                                />
                                <Typography color="red" variant="caption">
                                    {errors.image?.message}
                                </Typography>
                            </Grid>
                        </Box>
                    </Grid>
                }

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            <Box>
                <img src={image} width="100%" alt='fff'></img>
                {image ? <img src={image} width="100%" alt='fff'></img>
                    :
                    <p>image not selected</p>}
            </Box>
            <Box>
                <CardProduct product={product} />
            </Box>

        </Box>
    );
};

export default NewBannerForm;
