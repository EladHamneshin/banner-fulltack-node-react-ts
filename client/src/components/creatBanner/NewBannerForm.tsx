import React, { useState } from 'react';
import { Button, TextField, Box, Grid, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NewBannerInterface } from '../../types/BannerInterface';
import { Product } from '../../types/ProductInterface';
import { v4 as uuid } from 'uuid'
import UpImageBanner from './UpImageBanner';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    name: yup.string().max(20).required(),
    // size: yup.string().required(),
    // click: yup.number().default(0).required(),
    // image_url: yup.string().required(),
    // image_alt: yup.string().required(),
    // kind: yup.string().oneOf(['price', 'sale']).required(),
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
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const textFieldStyle = { padding: '2px', margin: '4px auto ' };

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<any> = async (data) => {
        console.log(data);
        // const productID = data.productID;
        // const catogryID = data.catogryID;
        // const click = 0;
        // const image = {
        //     url: data.image.url,
        //     alt: data.image.alt
        // };
        // const size = data.size;
        // const kind = data.kind;
        // const text = data.text;
        // const createdAt = data.createdAt;
        // const author = data.author;
        setLoading(true);
    };

    return (
        <Box>
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

                                {/* const allValuesArray = ['productID', 'catogryID', 'click', 'image url', 'image alt', 'size', 'kind', 'text', 'createdAt', 'author']; */}
                                <TextField style={textFieldStyle} label="Name" defaultValue={product.name}
                                    {...register("name", { required: true, maxLength: 20 })} />
                                <Typography color='red' variant='caption'> {errors.name?.message} </Typography>

                                <TextField style={textFieldStyle} label="Discription" placeholder="Discription"
                                    {...register("text", { required: true, maxLength: 20 })} />
                                <Typography color='red' variant='caption'> {errors.text?.message} </Typography>

                            </Grid>




                        </Box>

                    </Grid>
                }

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            <Box>

                <UpImageBanner />
            </Box>
        </Box>
    );
};

export default NewBannerForm;
