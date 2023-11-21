import React, { useState } from 'react';
import { Button, TextField, Box, Grid, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NewBannerInterface } from '../types/BannerInterface';

const schema = yup.object({
    productID: yup.string().required(),
    size: yup.string().required(),
    catogryID: yup.string().required(),
    click: yup.number().required(),
    image: yup.object({
        url: yup.string().required(),
        alt: yup.string().required(),
    }).required(),
    kind: yup.array(yup.string().oneOf(["price", "sale"])).required(),
    text: yup.string().required(),
    createdAt: yup.date().required(),
    author: yup.string().required(),
}).required();

const NewBannerForm = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const allValuesArray = ['productID', 'catogryID', 'click', 'image url', 'image alt', 'size', 'kind', 'text', 'createdAt', 'author'];

    const textFieldStyle = { padding: '2px', margin: '4px auto ' };

    const { register, formState: { errors }, handleSubmit } = useForm<NewBannerInterface>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<NewBannerInterface> = async (data) => {
        console.log(data);
        const productID = data.productID;
        const catogryID = data.catogryID;
        const click = 0;
        const image = {
            url: data.image.url,
            alt: data.image.alt
        };
        const size = data.size;
        const kind = data.kind;
        const text = data.text;
        const createdAt = data.createdAt;
        const author = data.author;
        setLoading(true);
    };

    return (
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {allValuesArray.map((textField, index) => {
                            return (
                                <Grid
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <TextField
                                        InputProps={{
                                            readOnly: index < 2 ? true : false,
                                        }}
                                        style={textFieldStyle}
                                        label={textField}
                                        {...(index < 2 ? { defaultValue: textField } : { placeholder: textField })}
                                        {...register(textField as keyof NewBannerInterface, { required: true, maxLength: 20 })}
                                        aria-invalid={errors[textField as keyof NewBannerInterface] ? 'true' : 'false'}
                                    />
                                    <Typography
                                        color='red'
                                        variant='caption'
                                    >
                                        {errors[textField as keyof NewBannerInterface]?.message}
                                    </Typography>
                                </Grid>
                            );
                        })}
                    </Box>
                </Grid>
            }

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default NewBannerForm;
