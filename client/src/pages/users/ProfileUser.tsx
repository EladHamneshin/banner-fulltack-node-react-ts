import { Edit } from '@mui/icons-material';
import { Card, Avatar, Typography, IconButton, Button } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => navigate('/banner/login');
    const goToEditUser = () => navigate('/banner/banners/user/edit');

    useEffect(() => {
        if (localStorage.getItem('token') === null) handleLoginRedirect();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                backgroundColor: '#f5d4d4',
                padding: '20px',
            }}
        >
            <Card sx={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>
                <Box sx={{ p: 8, display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src="avatar.jpg"
                        sx={{ bgcolor: green[500], margin: '20px', width: 80, height: 80, fontSize: '40px' }}
                    >
                        {localStorage.getItem('name')?.slice(0, 1).toUpperCase()}
                    </Avatar>
                    <Stack spacing={4}>
                        <Typography variant="h5" fontWeight="bold" sx={{ margin: '10px', color: blue[800] }}>
                            {localStorage.getItem('name')}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ margin: '10px' }}>
                            {localStorage.getItem('email')}
                        </Typography>
                    </Stack>
                    <IconButton sx={{ margin: '40px', color: blue[800] }} onClick={goToEditUser}>
                        <Edit fontSize="large" />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Button variant="contained" sx={{ backgroundColor: blue[800], color: '#fff' }} onClick={goToEditUser}>
                        Edit Profile
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default ProfileUser;
