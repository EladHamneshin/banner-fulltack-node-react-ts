import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function BannerNotFind() {
    const [open, setOpen] = React.useState(true);

    const navigate = useNavigate();

    const handelClickcreateBanner = () => {
        setOpen(false);
        navigate(`/banners/products`)
    }
    const handelClickAllBanners = () => {
        setOpen(false);
        navigate(`/banners`);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    backgroundColor: '#3bffd066',
                    '& .MuiDialogTitle-root': {
                        backgroundColor: 'blue',
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"There are no banners on your name"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to add a banner?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelClickAllBanners}>Back to all banners</Button>
                    <Button onClick={handelClickcreateBanner} autoFocus>
                        to add banner
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
