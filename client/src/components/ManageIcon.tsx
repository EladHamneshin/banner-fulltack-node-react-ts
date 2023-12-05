
import { Box,Tooltip,IconButton,Divider,ListItemIcon,MenuItem,Menu,Avatar} from '@mui/material';
import React, { useState } from 'react'
import {Settings,Logout} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { deleteUserFetch } from '../api/users/deleteUserFetch';
import { Response } from '../types/UserInterface';
// import { toastError, toastSuccess } from '../api/banners/toast';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { toastSuccess, toastError } from '../utils/toast';


const ManageIcon = () => {

    const navigate = useNavigate();
    const handelClickHomePage = () => navigate(`/banner/`)

    const handelClickLogin = () => {
        navigate(`/banner/login`)
        window.location.reload()
    }
    const handelClickProfil = () => navigate(`/banner/banners/user/profile`)
    const handelClickEditUser = () => navigate('/banner/banners/user/edit');


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = () => {
        setAnchorEl(null);
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        localStorage.removeItem('email')
        handelClickLogin()
    }
    const deleteUser = async () => {
        try {
            const data: Response = await deleteUserFetch()
            if (data.success === true) {
                toastSuccess(data.message)
                setTimeout(() => {
                    logout()
                }, 2000);
            }

        } catch (err) {
            toastError('deleted failed - try again');
            setTimeout(() => {
                handelClickHomePage()
            }, 2000);
            console.log(err);
        }
    };
    return (
        <Box>
            <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-label='IconButton'
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <ManageAccountsRoundedIcon sx={{
                                color: '#fff'
                            }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handelClickProfil}>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem onClick={handelClickEditUser}>
                        <Avatar>
                            <ModeEditIcon />
                        </Avatar>
                        Edit User Details
                    </MenuItem>
                    <MenuItem onClick={deleteUser}>
                        <Avatar>
                            <DeleteIcon />
                        </Avatar>
                        Delete User Details
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon >
                        Logout
                    </MenuItem>
                </Menu>
            </React.Fragment>
        </Box >
    )
}

export default ManageIcon