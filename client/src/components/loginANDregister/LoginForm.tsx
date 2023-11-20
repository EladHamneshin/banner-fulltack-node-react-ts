
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// import { loginUser as login } from '../../api/usersFuncApi';

// import { useSelector, useDispatch } from 'react-redux'
// import { insertDataToCart, incremntAmaount } from '../../Redux/cartSliec'
// import { LoginUser } from '../../types/UserType';
// import { UserContext } from '../../context/UserContext';
// import { addProductToCartByID, getAllProductFromCart } from '../../api/cartFuncApi';
// import { RootState } from '../../Redux/store';

const stylePos = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

const schema = yup.object({
    firstName: yup.string().max(12).required(),
    lastName: yup.string().max(12).required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(12).required()
})
    .required();

interface UserFormInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const textFieldStyle = { padding: '2px', margin: '4px auto ' }

type Props = {
    handelSignup: Dispatch<SetStateAction<string>>
    close: () => void
}

const LoginForm = () => {
    //   const dispatch = useDispatch()
    //   const context = useContext(UserContext);
    //   if (!context) return null;
    //   const { setUser } = context



    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    //   const cart = useSelector((state: RootState) => state.cart.cart);

    const { register, formState: { errors }, handleSubmit } = useForm<UserFormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
        console.log(data);
        const name = data.firstName + ' ' + data.lastName;
        const email = data.email
        const password = data.password

        //     const user = JSON.stringify({
        //       name: name,
        //       email: email,
        //       password: password
        //     });
        setLoading(true)
        //     try {
        //       const response = await login(user)
        //       const data: LoginUser = response.data

        //       // insert ls to db 
        //       const cartLS = localStorage.getItem('CartLS')
        //       if (cartLS) {
        //         const cart = JSON.parse(cartLS)
        //         for (const cartitem of cart) {
        //           for (let i = 0; i < cartitem.quantity; i++) {
        //             await addProductToCartByID(cartitem.productId._id, data.user._id)
        //             // dispatch(incremntAmaount())
        //           }
        //         } 
        //         console.log('hh');

        //         localStorage.removeItem('CartLS');
        //         console.log("ls inserted successfully to db");
        //       }

        //       setUser(data)
        //       const cartData = await getAllProductFromCart(data.user._id)
        //       dispatch(insertDataToCart(cartData));
        //       setMessage(data.message)
        //       setTimeout(() => {
        //         props.close()
        //         setLoading(false)
        //       }, 1000);

        //     } catch (err) {
        //       setMessage('login error - try again');
        //       setTimeout(() => {
        //         setLoading(false);
        //       }, 2000);
        //     }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {loading ? <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minWidth: '420px', minHeight: '360px' }}>
                <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>Loding.....</Typography>
                    {message && <Typography>{message}</Typography>}
                </Grid>
            </Box>
                :
                <Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField style={textFieldStyle} label="First Name" placeholder="Enter first name"
                                {...register("firstName", { required: true, maxLength: 20 })}
                                aria-invalid={errors.firstName ? "true" : "false"} />
                            <Typography color='red' variant='caption'>{errors.firstName?.message}</Typography>
                        </Grid>

                        <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField style={textFieldStyle} label="Last Name" placeholder="Enter last name"
                                {...register("lastName", { required: true, maxLength: 20 })}
                                aria-invalid={errors.lastName ? "true" : "false"} />
                            <Typography color='red' variant='caption'>{errors.lastName?.message}</Typography>
                        </Grid>
                    </Box>

                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField style={textFieldStyle} label="Email" placeholder="Enter your email" fullWidth
                            {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                            aria-invalid={errors.email ? "true" : "false"} />
                        <Typography color='red' variant='caption'>{errors.email?.message}</Typography>
                    </Grid>

                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField style={textFieldStyle} label="Password" placeholder="Enter your password" fullWidth
                            {...register("password", { required: true, min: 4, max: 12 })}
                            aria-invalid={errors.password ? "true" : "false"} />
                        <Typography color='red' variant='caption'>{errors.password?.message}</Typography>
                    </Grid>
                </Grid>}
            <Button
                type='submit'
                variant="contained"
                color="primary"
                fullWidth
            >
                sign in
            </Button>
        </form >
    )
}

export default LoginForm