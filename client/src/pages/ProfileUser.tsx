import { LocationOn, Edit } from '@mui/icons-material';
import { Card, Avatar, Typography, IconButton, Divider, Chip, Switch } from '@mui/material';
import { grey } from '@mui/material/colors';
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
                height: '50vh', // Adjust the height based on your layout needs
                backgroundColor: '#f5d4d4', // Change the background color
                padding: '20px', // Add padding
            }}
        >
            <Card>
                <Box sx={{ p: 4, display: 'flex' }}>
                    <Avatar variant="rounded" src="avatar.jpg" />
                    <Stack spacing={0.5}>
                        <Typography fontWeight="bold">
                            {localStorage.getItem('name')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <LocationOn sx={{ color: grey[500] }} /> Scranton, PA, United States
                        </Typography>
                    </Stack>
                    <IconButton size="small">
                        <Edit fontSize="small" />
                    </IconButton>
                </Box>
                <Divider />
                <Stack
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
                </Stack>
            </Card>
        </Box>
    );
};

export default ProfileUser;
