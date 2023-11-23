import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Drawer } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import React, { useState } from 'react';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import { useNavigate } from 'react-router-dom';




const SidBar = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({ left: false });

    const handelClickAllBanners = () => {
        navigate(`/deshbord/banners`)
        // window.location.reload();
    }

    const toggleDrawer =
        (_anchor: 'left', open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
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
                {['All banners', 'Starred', 'Send email', 'Drafts'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={text === 'All banners' ? handelClickAllBanners : undefined}>
                            <ListItemIcon>
                                {text === 'All banners' && <CardTravelIcon />}
                                {/* {index > 0 && index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
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
        </Box >
    );

    return (
        <div>
            <Button onClick={toggleDrawer('left', true)}>
                <MenuOpenOutlinedIcon
                    sx={{
                        transform: 'rotateY(180deg)'
                    }} />
            </Button>
            <Drawer
                anchor="left"
                open={state.left}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
        </div>
    );
};

export default SidBar;