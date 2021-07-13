import React from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {theme} from '../colorTheme';


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
}));

function NavBar(props) {
    const classes = useStyles;

    return (
        <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                    </Typography>
                    <Button variant= "contained" color="secondary" to="/signin" component={Link} style={{left:'71%'}}>Login</Button>
                    <Button variant= "contained" color="secondary" to="/signup" component={Link} style={{left:'72%'}}>Sign Up</Button>
                    
                </Toolbar>
            </AppBar>
        </div>
        </ThemeProvider>
    );
}

export default withRouter(NavBar);