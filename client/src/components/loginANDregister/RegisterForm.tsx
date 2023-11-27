import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { regiterFetch } from '../../api/users/regiterFetch';
// import { signupUser } from '../../api/usersFuncApi';

const schema = yup.object({
  firstName: yup.string().max(12).required(),
  lastName: yup.string().max(12).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(12).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')])
})
  .required();




const RegisterForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const textFieldStyle = { padding: '2px', margin: '4px auto ' }


  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<any> = async (data) => {

    const moveToLogin = () => {
      navigate(`/login`)
    }

    const name = data.firstName + ' ' + data.lastName;
    const email = data.email
    const password = data.password

    const user = {
      name: name,
      email: email,
      password: password,
      isAdmin: true
    };
    setLoading(true)
    try {
      const data = await regiterFetch(user)

      console.log(data);
      console.log('data.success', data.success);
      if (data.success === true) { moveToLogin() };

      setTimeout(() => {
        setLoading(false)
      }, 1000);

    } catch (err) {
      setMessage('sign up faild - try again');
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  return (
    <>
      {loading ? <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minWidth: '420px', minHeight: '360px' }}>
        <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography>Loding.....</Typography>
          {message && <Typography>{message}</Typography>}
        </Grid>
      </Box>
        :
        <form onSubmit={handleSubmit(onSubmit)}>

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
          <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField style={textFieldStyle} label="Confirm Password" placeholder="Confirm your password" fullWidth
              {...register("confirmPassword", { required: true })}
              aria-invalid={errors.password ? "true" : "false"} />
            <Typography color='red' variant='caption'>{errors.confirmPassword?.message}</Typography>
          </Grid>

          <Button
            type='submit'
            variant="contained"
            color="primary"
            fullWidth
          >
            sign up
          </Button>
        </form >}
    </>
  )
}

export default RegisterForm