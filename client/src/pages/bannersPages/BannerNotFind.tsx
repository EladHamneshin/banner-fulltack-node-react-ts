import  { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BannerNotFind = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleCreateBannerClick = () => {
        setOpen(false);
        navigate(`/banner/banners/products`);
    };

    const handleAllBannersClick = () => {
        setOpen(false);
        navigate(`/banner/banners`);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    backgroundColor: '#3bffd066',
                    '& .MuiDialogTitle-root': {
                        backgroundColor: '#2196F3',
                        color: '#fff',
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">{"There are no banners on your name"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to add a banner?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAllBannersClick} color="primary">
                        Back to all banners
                    </Button>
                    <Button onClick={handleCreateBannerClick} color="primary" autoFocus>
                        Add a banner
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BannerNotFind;
