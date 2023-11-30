import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { loginFetch } from '../../api/users/loginFetch';
import { Response } from '../../types/UserInterface';
import { useNavigate } from 'react-router-dom';
import Circular from '../Circular';


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

const LoginForm = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const { register, formState: { errors }, handleSubmit } = useForm<UserFormInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<UserFormInput> = async (data) => {

        const email = data.email
        const password = data.password

        const user = JSON.stringify({
            email: email,
            password: password
        });

        setLoading(true)
        const handelClickHomePage = () => {
            navigate(`/banners/`)
            window.location.reload();
        }
        try {
            const data: Response = await loginFetch(user)

            if (data.success === true) {
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('name', data.data.user.name)
                localStorage.setItem('userID', data.data.user.id)
                setLoading(false)
                handelClickHomePage()
            }

            setMessage(data.message)

            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } catch (err) {
            setMessage('login error - try again');
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {loading ?
                <Box>
                    <Circular />
                    {message && <Typography>{message}</Typography>}
                </Box>
                :
                <Grid>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <Grid
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <TextField
                                style={textFieldStyle}
                                label="First Name"
                                placeholder="Enter first name"
                                {...register("firstName",
                                    { required: true, maxLength: 20 }
                                )}
                                aria-invalid={
                                    errors.firstName ? "true" : "false"
                                } />
                            <Typography
                                color='red'
                                variant='caption'
                            >
                                {errors.firstName?.message}
                            </Typography>
                        </Grid>

                        <Grid
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                            <TextField
                                style={textFieldStyle}
                                label="Last Name"
                                placeholder="Enter last name"
                                {...register("lastName", {
                                    required: true, maxLength: 20
                                })}
                                aria-invalid={errors.lastName ? "true" : "false"} />
                            <Typography
                                color='red'
                                variant='caption'
                            >
                                {errors.lastName?.message}
                            </Typography>
                        </Grid>
                    </Box>

                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <TextField
                            style={textFieldStyle}
                            label="Email"
                            placeholder="Enter your email"
                            fullWidth
                            {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                            aria-invalid={errors.email ? "true" : "false"} />
                        <Typography
                            color='red'
                            variant='caption'
                        >
                            {errors.email?.message}
                        </Typography>
                    </Grid>

                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <TextField
                            style={textFieldStyle}
                            label="Password"
                            placeholder="Enter your password"
                            fullWidth
                            {...register("password", { required: true, min: 4, max: 12 })}
                            aria-invalid={errors.password ? "true" : "false"} />
                        <Typography
                            color='red'
                            variant='caption'
                        >
                            {errors.password?.message}
                        </Typography>
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