import React, { Dispatch, SetStateAction, useState } from 'react';
import { Avatar, Button, Grid, Paper, } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import RegisterForm from '../components/loginANDregister/RegisterForm';
import { useNavigate } from 'react-router-dom';

type Props = {

};

const Register = (props: Props) => {
    const navigate = useNavigate();
    const handelClickLogin = ( ) => {
        navigate(`/deshbord/login`)
    }

    const paperStyle = { padding: 20, margin: '0 auto ' };
    const avatarStyle = { backgroundColor: 'green' };


    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '70vh' }}>
            <Paper elevation={10} style={paperStyle}>
                <Grid container direction="column" justifyContent="center" alignItems="center" >
                    <Grid item>
                        <Avatar style={avatarStyle}>
                            <LockOpenOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <h2>Signup</h2>
                    </Grid>
                </Grid>
                <RegisterForm />

            <Button onClick={handelClickLogin} >
                sign in
            </Button>
            </Paper>
        </Grid>
    );
};

export default Register;