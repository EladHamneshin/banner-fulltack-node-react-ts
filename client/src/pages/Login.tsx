import { Typography, Avatar, Button, Checkbox, Grid, Paper, TextField, Link, Box } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoginForm from '../components/loginANDregister/LoginForm';
import { useNavigate } from 'react-router-dom';
import { getAllBannersImage } from '../api/bannersImageFunc';
// import Signup from './Signup';


type Props = {
    // handelSignup : Dispatch<SetStateAction<string>>
    // close: () => void
}

const Login = (props: Props) => {

    const navigate = useNavigate();
    const handelClickSignUp = () => {
        navigate(`/deshbord/register`)
    }

    getAllBannersImage()

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
                // elevation={10}
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