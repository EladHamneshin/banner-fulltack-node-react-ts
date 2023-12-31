import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from '@mui/material';
import React, { useState } from 'react';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { useNavigate } from 'react-router-dom';
import ViewDaySharpIcon from '@mui/icons-material/ViewDaySharp';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const SidBar = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({ left: false });

    const handelClickAllBanners = () => navigate(`/banner/banners`);

    const handelClickAllProducts = () => navigate(`/banner/banners/products`);

    const handelClickMyBanners = () => navigate(`/banner/banners/user/${localStorage.getItem('name')}`);

    const toggleDrawer = (_anchor: 'left', open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, left: open });
    };

    const list = (anchor: 'left') => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Drafts', 'All banners', 'All products', 'My bannars'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                if (text === 'All banners') {
                                    handelClickAllBanners();
                                } else if (text === 'All products') {
                                    handelClickAllProducts()
                                } else if (text === 'My bannars') {
                                    handelClickMyBanners();
                                }
                            }}
                        >
                            <ListItemIcon>
                                {text === 'All banners' && <CardTravelIcon />}
                                {text === 'All products' && <IntegrationInstructionsIcon />}
                                {text === 'My bannars' && <ViewDaySharpIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All users', 'Trash', 'Spam'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {
                            const handelClickAllUsers = () => navigate(`/banner/banners/user/users`);
                            if (text === 'All users') {
                                handelClickAllUsers();
                            }
                        }}>
                            <ListItemIcon>
                                {text === 'All users' && <AccountBoxIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ zIndex: '9100' }}>
            <ListItemButton onClick={toggleDrawer('left', true)}>
                <MenuOpenOutlinedIcon
                    sx={{ transform: 'rotateY(180deg)', color: '#fff' }} />
            </ListItemButton>
            <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </Box>
    );
};

export default SidBar;
