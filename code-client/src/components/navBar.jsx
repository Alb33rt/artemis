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
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Theme} from "../colorTheme";
import AuthContext from "../auth-context";


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
    return (
            <Hidden smDown>
                <Button variant="contained" color="primary" component={Link} to="/logout" style={{ left: '78%' }}>Log Out</Button>
                <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                style={{ left: '80%' }}
                >
                <AccountCircle />
                </IconButton>
            </Hidden>
    )
}

function NavInterface(props) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == "true") {
        return <LogoutInterface />
    }
    return <LoginInterface />
}

class NavBar extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: localStorage.getItem('isLoggedIn')
        }
    }

    componentDidMount() {
    }  

    render() {
    //    this.Authentication()
        return (
            <ThemeProvider theme={Theme}>
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
                                
                                <NavInterface />
                            </Container>
                        </Toolbar>
                    </AppBar>
                </div>
            </ThemeProvider>
        );
    }
}

export default withRouter(NavBar);