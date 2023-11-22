import React from 'react';
import NewBannerForm from '../components/NewBannerForm';
import { Grid, Paper, Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

type Props = {};

const CreateBanner = (props: Props) => {
    const paperStyle = {
        padding: 20,
        margin: '0 auto',
        boxShadow: '0',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column', // Adjusted to column direction
    };

    const avatarStyle = { backgroundColor: 'green', marginBottom: '1rem' }; // Added margin-bottom

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: '70vh',
                display: 'flex',
                '& .MuiPaper-root': {
                    // Adjust styles for the Paper component
                    ...paperStyle,
                },
            }}
        >
            <Paper elevation={10}>
                <Box sx={{ padding: '20px' }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Avatar style={avatarStyle}>
                                <EnhancedEncryptionIcon />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" gutterBottom>
                                new banner
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <NewBannerForm />
                </Box>
            </Paper>
        </Grid>
    );
};

export default CreateBanner;
