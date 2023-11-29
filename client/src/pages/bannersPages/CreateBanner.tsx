import { useEffect, useState } from 'react';
import NewBannerForm from '../../components/creatBanner/NewBannerHeder';
import { Grid, Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

import { useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/product/getProductById';





const CreateBanner = () => {
    const [product , setProduct] = useState(null)
    useEffect(() => {
        const api =  async () => {
            
            const data = await getProductById("044576d1-dd03-4787-99bb-ed4a74f4eeeb")
            console.log(data);
            
            setProduct (data)
        }
        api()
        
        
    }, [])
    const navigate = useNavigate();
    const handelClickLogin = () => { navigate(`login`) }
    useEffect(() => {
        if (localStorage.getItem('token') === null) { handelClickLogin() }
    }, [])
    
    const paperStyle = {
        margin: '0 auto',
        boxShadow: '0',
        display: 'flex',

    };

    const avatarStyle = { backgroundColor: 'green', marginBottom: '1rem' }; // Added margin-bottom

    return (
        <Grid
            sx={{
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column', // Adjusted to column direction

                '& .MuiPaper-root': {
                    // Adjust styles for the Paper component
                    ...paperStyle,
                },
            }}
        >

            {/* <Paper elevation={10}> */}
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <Avatar style={avatarStyle}>
                        <EnhancedEncryptionIcon />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        creat new banner
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', padding: '33px', alignSelf: 'end' }}>
                {product && <NewBannerForm product={product} />}
            </Box>
            {/* </Paper> */}
        </Grid>
    );
};

export default CreateBanner;
