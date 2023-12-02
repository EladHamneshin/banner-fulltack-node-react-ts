import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import React, { useState } from 'react';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { useNavigate } from 'react-router-dom';
import ViewDaySharpIcon from '@mui/icons-material/ViewDaySharp';
import AddCardIcon from '@mui/icons-material/AddCard';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const SidBar = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({ left: false });

    const handelClickAllBanners = () => {
        navigate(`/banners/banners`);
    };
    const handelClickAllProducts = () => {
        navigate(`/banners/banners/products`);
    };
    // const handelClickCreateBanners = () => {
    //     navigate(`/banners/createBanner`);
    // };

    const handelClickMyBanners = () => {
        navigate(`/banners/banners/user/${localStorage.getItem('name')}`);
    };

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
                {['All banners', 'All products', 'My bannars', 'Drafts'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                if (text === 'All banners') {
                                    handelClickAllBanners();
                                } else if (text === 'All products') {
                                    handelClickAllProducts()
                                } else if (text === 'My bannars') {
                                    handelClickMyBanners();
                                } else if (text === 'Add banner') {
                                    // handelClickCreateBanners();
                                }
                            }}
                        >
                            <ListItemIcon>
                                {text === 'All banners' && <CardTravelIcon />}
                                {text === 'All products' && <IntegrationInstructionsIcon />}
                                {text === 'My bannars' && <ViewDaySharpIcon />}
                                {text === 'Add banner' && <AddCardIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ zIndex:'9100'}}>
            <ListItemButton onClick={toggleDrawer('left', true)}>
                <MenuOpenOutlinedIcon
                    sx={{
                        transform: 'rotateY(180deg)', color: '#fff'
                    }}
                />
            </ListItemButton>
            <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </Box>
    );
};

export default SidBar;
