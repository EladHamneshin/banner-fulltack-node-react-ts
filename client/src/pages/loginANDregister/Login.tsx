import { Typography, Avatar, Button, Grid, Paper, Link, Box } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LoginForm from '../../components/loginANDregister/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();
    const handelClickSignUp = () => {
        navigate(`/banner/register`)
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
                                login
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    flexDirection: 'column'
                }}>
                    <LoginForm />
                    <Typography>
                        <Link href='#'>
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography>
                        <Button onClick={handelClickSignUp} >
                            sign Up
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
};

export default Login;