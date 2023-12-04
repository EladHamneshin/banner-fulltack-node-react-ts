import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
// import { toastError, toastSuccess } from '../../utils/toast';
import React, { useEffect } from 'react';
// import { editUserFetch } from '../../api/users/editUser';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Response } from '../../types/UserInterface';
import { toastSuccess, toastError } from '../../utils/toast';
import { editUserFetch } from '../../api/users/editUser';

const schema = yup.object({
    Name: yup.string().max(25).required(),
    email: yup.string().email().required(),
    password: yup.string().min(4).max(12).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')])
})
    .required();




const EditUserForm = () => {
    const navigate = useNavigate();
    const handleClickLogin = () => navigate('/banner/login');

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) handleClickLogin()
    }, []);

    const textFieldStyle = { padding: '2px', margin: '4px auto ' }

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<any> = async (data) => {

        const moveToEditUser = () => navigate('/banners/banners/user/edit');


        const handelClickHomePage = () => {
            navigate(`/banners/`)
            window.location.reload();
        }

        const name = data.Name;
        const email = data.email
        const password = data.password

        const user = {
            name: name,
            email: email,
            password: password,
            isadmin: true
        };
        try {
            const data: Response = await editUserFetch(user)


            if (data.success === true) {
                toastSuccess(data.message)

                localStorage.setItem('token', data.data.name)
                localStorage.setItem('name', data.data.name)
                localStorage.setItem('userID', data.data.id)
                localStorage.setItem('email', data.data.email)
                setTimeout(() => {
                    handelClickHomePage()
                }, 2000);
            }


        } catch (err) {
            toastError('edited faild - try again');
            setTimeout(() => {
                moveToEditUser()
            }, 2000);
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField style={textFieldStyle} label="Name" defaultValue={localStorage.getItem('name')} fullWidth
                    {...register("Name", { required: true, maxLength: 20 })}
                    aria-invalid={errors.Name ? "true" : "false"} />
                <Typography color='red' variant='caption'>{errors.Name?.message}</Typography>
            </Grid>

            <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    style={textFieldStyle}
                    label="Email"
                    defaultValue={localStorage.getItem('email')}
                    fullWidth
                    {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                    aria-invalid={errors.email ? "true" : "false"} />
                <Typography color='red' variant='caption'>{errors.email?.message}</Typography>
            </Grid>

            <Grid sx={{ display: 'flex', flexDirection: 'column' }}
                style={textFieldStyle}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        New Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", { required: true, min: 4, max: 12 })}
                        aria-invalid={errors.password ? "true" : "false"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="New Password" />
                    <Typography color='red' variant='caption'>{errors.password?.message}</Typography>
                </FormControl>
            </Grid>

            <Grid sx={{ display: 'flex', flexDirection: 'column' }}
                style={textFieldStyle}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">
                        Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("confirmPassword", { required: true })}
                        aria-invalid={errors.password ? "true" : "false"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm New Password" />
                    <Typography color='red' variant='caption'>{errors.confirmPassword?.message}</Typography>
                </FormControl>
            </Grid>

            <Button
                type='submit'
                variant="contained"
                color="primary"
                fullWidth >
                edit details
            </Button>
        </form >
    )
}

export default EditUserForm