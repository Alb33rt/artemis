import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles, ThemeProvider, styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '../colorTheme.js';
import { toast } from "react-toastify";

import DashboardIcon from '@material-ui/icons/Dashboard';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import SettingsIcon from '@material-ui/icons/Settings';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(50),
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
    drawerPaper: {
    width: drawerWidth,
    },
    drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    },
}));

const classes = useStyles;

function LoginInterface(props) {
    return (
        <Hidden smDown>
            <Button variant="contained" color="primary" className={classes.title} to="/signin" component={Link} style={{ left: '66%' }}>
                Login
            </Button>
            <Button variant="contained" color="primary" className={classes.title} to="/signup" component={Link} style={{ left: '67%' }}>
                Register
            </Button>
        </Hidden>
    )
}

function LogoutInterface(props) {
    const { setLoginState } = props;

    const logoutRequest = (e) => {
        e.preventDefault();
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            const { history } = props;
            let logoutConfirm = window.confirm("Are you sure you want to log out?");
            if (!logoutConfirm) {
                return false;
            }
            const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "POST",
                "Authorization": localStorage.getItem("Authentication")
            },
            body: JSON.stringify({
            })
            };
            console.log("Logging User Out through API");

            fetch('http://localhost:8000/api-login/logout', requestOptions)
            .then(res => res.json())
            .then( (result) => {
                console.log(result);
                localStorage.removeItem("Authentication");
                localStorage.setItem('isAuthenticated', false);
                localStorage.setItem('isLoggedIn', false);  
                toast("You have signed out of Artemis.")

                // handleClick();
                setLoginState();
                history.push("/");
            })
            .catch(error => {
                console.log(error)
                // this.handleClick();
                setLoginState();
        });
        }
    }

    return (
            <Hidden smDown>
                <Button variant="contained" color="primary" onClick={logoutRequest} style={{ left: '78%' }}>Log Out</Button>
                <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                style={{ left: '80%' }}
                component={Link}
                to="/dashboard"
                >
                <AccountCircle />
                </IconButton>
            </Hidden>
    )
}

function NavInterface(props) {
    const { setLoginState } = props;
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === "true") {
        return <LogoutInterface setLoginState={setLoginState}/>
    }
    return <LoginInterface />
}

function NavBar(props) {
    const { setLoginState } = props;
    const theme = Theme;
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth="lg">
                            { isLoggedIn && 
                                <IconButton edge="start" className={classes.menuButton}  onClick={handleDrawerOpen} color="inherit" aria-label="menu">
                                    <MenuIcon />
                                </IconButton> }
                            <Button color="secondary" className={classes.title} to="/" component={Link}>
                                Artemis 
                            </Button>
                            
                            <NavInterface setLoginState={setLoginState}/>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <ListItem button key="Dashboard" component={Link} to="/dashboard">
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard"  />
                        </ListItem>
                        <ListItem button key="Carbon Entries" component={Link} to="/carbonEntryPage">
                            <ListItemIcon>
                                <NaturePeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Carbon Entries" />
                        </ListItem>
                        <ListItem button key="Green Entries" component={Link} to="/greenEntryPage">
                            <ListItemIcon>
                                <NaturePeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Green Entries" />
                        </ListItem>
                        <ListItem button key="Donation" component={Link} to="/donation">
                            <ListItemIcon>
                                <AccountBalanceIcon />
                            </ListItemIcon>
                            <ListItemText primary="Donation" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                    <ListItem button key="Profile" component={Link} to="/profile">
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings"  />
                    </ListItem>
                    <ListItem button key="Contacts" component={Link} to="/contactus">
                            <ListItemIcon>
                                <PhoneIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contacts"  />
                    </ListItem>
                    <ListItem button key="Home" component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home"  />
                    </ListItem>
                    </List>
                </Drawer>
            </div>
        </ThemeProvider>
        
    );
}


export default withRouter(NavBar);