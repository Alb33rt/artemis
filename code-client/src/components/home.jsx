import React from "react";
import Container from '@material-ui/core/Container';
import styled, { css } from 'styled-components/macro'
import backgroundImage from '../images/545792.jpg';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
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

const WhiteTextTypography = withStyles({
    root: {
        color: "#eaedd5",
        textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
        fontFamily: "Garamond, serif"
    }
})(Typography);


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
                    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: `round` }}>
                        {/* Increase the priority of the hero background image */}
                        {<img style={{ display: 'none' }} src={backgroundImage} />}
                        <div className={classes.overlay} />
                        <Grid container justify="center" alignItems="center">
                            <Grid item md={6} alignItems="center">
                                <div className={classes.mainFeaturedPostContent}>
                                    <WhiteTextTypography component="h2" variant="h2" color="textSecondary" gutterBottom align="center">
                                        <br></br>
                                        <br></br>
                                        Plant a tree, save the world.
                                        <br></br>
                                        <br></br>
                                    </WhiteTextTypography>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={0} />
                    <Grid container>
                        <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            <br></br>
                            Introduction
                        </Typography>
                            <Typography>
                                As we are here in 2021. There are more and more volume in discussing climate change around the whole world. It is very distinct, but obvious that people focus the cause of this matter with carbon emission. Last year along, the world have emitted 36.44 billion metric tons of that. It is ultimately relatable and understandable, since carbon dioxide is reasoning to our current situation. But, looking back to these emission, really none of these emission are done naturally. Nearly all emission are done through human measure. Domestication, Deforestation, Industrialization, Power Generation, Habitual Emission. We are facing factors that are not removable from current society, except for one.
                            </Typography></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            <br></br>
                            Collectivist in Deforestation
                        </Typography>
                            <Typography>
                            Deforestation is a one of the few carbon emitting factor humans us can deal with. But are we really making enough effort collectively? Ultimately, no. Which is sad. So, we here by to promote you to join us with our goal of contributing to climate change “Collectively”. By planting trees all around the world, we would be able to erase our carbon footprint step by step collectively as a whole. But this process cannot be achieved without the effort of everybody. We want you to join us to make a change.                            </Typography></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            <br></br>
                            Our Goal
                        </Typography>
                            <Typography>
                            We are a collective group of being wishes you to make an effort for our response/support to the depressing scenario of climate change. We would like to you to be aware of you own carbon emission. If possible, we wish you to fund us to plant trees around the world.                             </Typography></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            <br></br>
                            Methodology
                        </Typography>
                            <Typography>
                            Sign up today for yourself and the environment. Log your carbon emission day-by-day. Check if you are making more emission that the people around you. Aim to emit less and less for this world. To make contributions, you are able to donate for plant trees funded by your own hands!                            </Typography></Grid>
                        <Grid item xs={6}></Grid>
                    </Grid>
                    <Paper />
                </Container>
            </ThemeProvider>
        )
    }
}

export default withRouter(Home);