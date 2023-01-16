import { Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { authenticationService } from '../../services/authentication.service';
import { useEffect, useState } from 'react';
import { DrawerWidth, LinkStyle } from '../../helpers/Styles';
import { NavMenu } from './NavMenu';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import Box from '@mui/material/Box';
import './NavMenu.css';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DrawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const PersistentDrawerLeft = (props: any) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {props.isLoggedIn &&
                <Drawer
                    sx={{
                        width: DrawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DrawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={props.open}
                >
                    <DrawerHeader />
                    <List>
                        <Link to="/passwords" style={LinkStyle}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <KeyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Passwords" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>

                    <List sx={{ mt: "auto" }}>
                        <Link to="/userAccount" style={LinkStyle}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Account" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            }

            <Main open={props.open}>
                <Container>
                    {props.children}
                </Container>
            </Main>
        </Box>
    );
}


export function Layout(props: any) {
    const [open, setOpen] = useState<boolean>(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    }
    return (
        <div style={{ height: "100vh" }}>
            <NavMenu isLoggedIn={props.isLoggedIn} handleDrawerOpen={handleDrawerOpen} />
            <PersistentDrawerLeft open={open} isLoggedIn={props.isLoggedIn} children={props.children} />
        </div>
    );
}