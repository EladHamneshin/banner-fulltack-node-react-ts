import { LocationOn, Edit } from '@mui/icons-material';
import { Card, Avatar, Typography, IconButton, Divider, Chip, Switch } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProfileUser = () => {
    const [active, setActive] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/banner/login');
    };

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handleLoginRedirect();
        }
    }, []);


    const handleSwitchChange = () => {
        setActive((prevActive) => !prevActive);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh', // Adjust the height based on your layout needs
                backgroundColor: '#f5d4d4', // Change the background color
                padding: '20px', // Add padding
            }}
        >
            <Card>
                <Box sx={{ p: 8, display: 'flex',alignItems: 'center' }}>
                    <Avatar  src="avatar.jpg" sx={{
                         bgcolor: green[500],
                         margin:'20px', 
                         width: 56, 
                         height: 56}}>
                            {localStorage.getItem('name')?.slice(0,1).toUpperCase()}
                         </Avatar>
                    <Stack spacing={4}>
                        <Typography variant="h6"  fontWeight="bold" sx={{margin:'10px'}}>
                            {localStorage.getItem('name')}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{margin:'10px'}}>
                            {/* <LocationOn sx={{ color: grey[500] }} /> */}
                            {localStorage.getItem('email')}
                        </Typography>
                    </Stack>
                    <IconButton sx={{margin:'40px'}}>
                        <Edit   fontSize="large"/>
                    </IconButton>
                </Box>
                {/* <Divider /> */}
                {/* <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
                >
                    <Chip
                        label={active ? 'Active account' : 'Inactive account'}
                        color={active ? 'success' : 'default'}
                        size="small"
                    />
                    <Switch checked={active} onChange={handleSwitchChange} />
                </Stack> */}
            </Card>
        </Box>
    );
};

export default ProfileUser;
