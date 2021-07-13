import React from "react";
import { Link, withRouter } from "react-router-dom";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
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
                    <Container maxWidth="lg">
                        <Hidden mdUp>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Button color="secondary" className={classes.title} to="/" component={Link}>
                            Artemis
                        </Button>
                        <Hidden mdDown>
                            <Button variant= "contained" color="primary" to="/signin" component={Link} style={{left:'71%'}}>Login</Button>
                            <Button variant= "contained" color="primary" to="/signup" component={Link} style={{left:'72%'}}>Sign Up</Button>
                        </Hidden>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
        </ThemeProvider>
    );
}

export default withRouter(NavBar);