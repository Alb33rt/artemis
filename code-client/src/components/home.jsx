import React from "react";
import Container from '@material-ui/core/Container';
import styled, { css } from 'styled-components/macro'
import backgroundImage from '../images/hero_Shot.jpg';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { theme } from "../colorTheme";

/*
const HeroSection = styled.section`
    
    position: relative;
    overflow: hidden;

`;

const HeroWrapper = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
`;

     
            <HeroSection>
                <HeroWrapper>
                    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
                        but something here
                    </div>
                </HeroWrapper>
            </HeroSection>
*/
const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },

    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

const classes = useStyles;

class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem("isAuthenticated")
        }
    }

    componentDidMount() {
        const { history } = this.props;
        if (this.state.isAuthenticated) {
            history.push('/dashboard');
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${backgroundImage})` }}>
                        {/* Increase the priority of the hero background image */}
                        {<img style={{ display: 'none' }} src={backgroundImage} />}
                        <div className={classes.overlay} />
                        <Grid container>
                            <Grid item md={6} alignItems="center">
                                <div className={classes.mainFeaturedPostContent}>
                                    <Typography component="h1" variant="h3" color="textPrimary" gutterBottom align="center">
                                        Plant a tree, save the world.
                                    </Typography>
                                    <Typography variant="h5" color="textPrimary" paragraph>
                                        test
                                    </Typography>
                                    <Link variant="subtitle1" href="#" color="textPrimary" paragraph>
                                        test
                                    </Link>
                                    <br></br><br></br><br></br><br></br><br></br>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </ThemeProvider>
        )
    }
}

export default withRouter(Home);