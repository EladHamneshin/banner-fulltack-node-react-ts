import { useState } from 'react';
import { Button, TextField, Box, Grid, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from '../../types/ProductInterface';
import { v4 as uuid } from 'uuid'
import Circular from '../Circular';
// import AppKaka from '../../kaka/CropKaka/AppKaka';
import Canvas from '../../kaka/Canvas';
import BannerCanvas from '../../kaka/Canvas2';

// type SchemaData : yup.ObjectSchema<{
//     name: string;
//     size: NonNullable<"side" | "top" | "all" | undefined>;
//     image: AnyPresentValue;
//     kind: NonNullable<"price" | "sale" | undefined>;
//     text: string;

const schema = yup.object({
    name: yup.string().max(20).required(),
    size: yup.string().oneOf(['side', 'top', 'all']).required(),
    image: yup.mixed().required("Please upload an image"),
    kind: yup.string().oneOf(['price', 'sale']).required(),
    text: yup.string().max(20).required(),
    // author: yup.string().required(),
}).required();


type Props = {
    product: Product
    uploadImage: (image: File, name: string, size: string) => Promise<void>
    onSubmitForm: (data: any) => Promise<void>
}



const AddBannerForm = (props: Props) => {


    const product = props.product

    const [message] = useState('');
    const [loading, setLoading] = useState(false);




    const textFieldStyle = { padding: '2px', margin: '4px auto ' };

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<any> = async (data) => {
        setLoading(true);
        console.log(data);

        const file = new File([data.image[0]], 'example.jpg', { type: 'image/jpeg' });
        await props.uploadImage(file, data.name, data.size)
        // props.setdataForm(newBanner)
        await props.onSubmitForm(data)
        setLoading(false);


        // setImage(data.image[0])
    };




    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loading ?
                <Box>
                    <Circular />
                    <Typography>Loding.....</Typography>
                    {message && <Typography>{message}</Typography>}
                </Box>
                :
                <Grid>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>


                        <Grid key={uuid()} sx={{ display: 'flex', flexDirection: 'column', }}>


                            <TextField style={textFieldStyle} label="Name" value={`${product.name}`}
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

                             <Canvas width={600} height={120}  product={product}/> 
                             {/* <BannerCanvas width={600} height={120} product={product}/> */}

                        </Grid>


                    </Box>
                </Grid>
            }

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    )
}

export default AddBannerForm