import { Avatar, Box, Button, Grid, Paper, Typography, } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import RegisterForm from '../../components/loginANDregister/RegisterForm';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const navigate = useNavigate();
    const handelClickLogin = () => {
        navigate(`/deshbord/login`)
    }

    const paperStyle = {
        padding: 20,
        margin: '0 auto ',
        boxShadow: '0',
        display: 'flex',
        alignItems: 'center'
    };
    const avatarStyle = { backgroundColor: 'green' };


    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
                minHeight: '70vh',
                display: 'flex'
            }}
        >
            <Paper
                style={paperStyle}>
                <Box sx={{
                    padding: '20px'
                }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Avatar style={avatarStyle}>
                                <LockOpenOutlinedIcon />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" gutterBottom>
                                Signup
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    flexDirection: 'column'
                }}>
                    <RegisterForm />
                    <Button onClick={handelClickLogin} >
                        sign in
                    </Button>
                </Box>
            </Paper>
        </Grid>
    );
};

export default Register;