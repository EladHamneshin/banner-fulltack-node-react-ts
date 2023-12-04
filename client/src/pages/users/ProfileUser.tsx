import { Edit } from '@mui/icons-material';

import { Card, Avatar, Typography, IconButton } from '@mui/material';
import { green } from '@mui/material/colors';
import { Box, Stack } from '@mui/system';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';


const ProfileUser = () => {

    const navigate = useNavigate();

    const handleLoginRedirect = () => navigate('/banner/login');
        

    const goToEditUser = () =>   navigate('/banner/banners/user/edit');


    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            handleLoginRedirect();
        }
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
            }}>
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
                            {localStorage.getItem('email')}
                        </Typography>
                    </Stack>
                    <IconButton sx={{margin:'40px'}}
                    onClick={goToEditUser}>
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
