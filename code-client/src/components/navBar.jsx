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
import { theme } from '../colorTheme';


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
        <div>
            <Button variant="contained" color="primary" className={classes.title} to="/signin" component={Link} style={{ left: '66%' }}>
                Login
            </Button>
            <Button variant="contained" color="primary" className={classes.title} to="/signup" component={Link} style={{ left: '67%' }}>
                Register
            </Button>
        </div>
    )
}

function LogoutInterface(props) {
    return (
        <div>
            <Hidden smDown>
                <Button variant="contained" color="primary" component={Link} style={{ left: '78%' }}>Log Out</Button>
            </Hidden>
        </div>
    )
}

function NavInterface(props) {
    const isLoggedIn = props.isLoggedIn;
    console.log("in nav")
    if (isLoggedIn) {
        return <LogoutInterface />
    }
    return <LoginInterface />
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            loggedIn: false
        }
    }

    componentDidMount() {
        const isAuthenticated = this.state.isAuthenticated;
        const loggedIn = this.state.loggedIn;
        if (isAuthenticated) {
            this.setState(
                {loggedIn: true}
            )
        }
    }  

    render() {
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
                                <NavInterface isLoggedIn={this.state.loggedIn} />
                            </Container>
                        </Toolbar>
                    </AppBar>
                </div>
            </ThemeProvider>
        );
    }
}

export default withRouter(NavBar);