import React from "react";
import Container from '@material-ui/core/Container';
import styled, { css } from 'styled-components/macro'
import forestImage from '../images/forest.png';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Theme } from "../colorTheme";
import intro from '../images/Introduction.jpg'
import deforestation from '../images/deforestation.jpg'
import goals from '../images/15.b.png'
import method from '../images/Method.jpg'
import { Box } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import SDG_imageA from '../images/icons/GOAL_15_TARGET_15.6.svg';
import SDG_imageB from '../images/icons/GOAL_15_TARGET_15.B.svg';
import SDG_imageC from '../images/icons/GOAL_15_TARGET_15.C.svg';
import zIndex from "@material-ui/core/styles/zIndex";


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
    mainTitle: {
        marginTop: '',
    },

    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        Image: 'url(https://source.unsplash.com/random)',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
        width: "100%",
    },
    mainSection: {
        backgroundImage: "url(../images/forest.png)",
        backgroundSize: 'cover',
    },
    imageIcon: {
        height: '100%'
    },
    iconRoot: {
    textAlign: 'center'
    }
}));

const WhiteTypography = withStyles({
    root: {
        color: "#000000"
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
        const loggedIn = localStorage.getItem('isLoggedIn');
    }

    render() {
        return (
            <ThemeProvider theme={Theme}>
                <Paper className={classes.mainFeaturedPost} >
                    {/* Increase the priority of the hero background image */}
                    {<img style={{ display: 'none' }} src={Image} />}
                    <Box mx="auto" className={classes.mainSection}>
                        <img style = {{width:'100%', height:'auto', opacity:'0.85', filter: 'brightness(70%)', zIndex:'1'}} src={forestImage}></img>
                        <Container maxWidth="lg">
                            <Box mt={-60} mb={50}>
                          
                            <Grid container spacing={20} justify="center" alignItems="center">
                            
                                    <Grid item md={12} alignItems="center" spacing={20}>
                                        
                                        <div className={classes.mainFeaturedPostContent} style={{zIndex:'3'}}>
                                            <WhiteTypography component="h3" variant="h3" color="textPrimary" gutterBottom align="center">
                                                Plant a tree, Save the world.
                                            </WhiteTypography>
                                            <WhiteTypography component="h3" variant="h3" color="textPrimary" gutterBottom align="center">
                                                Welcome to Artemis.
                                            </WhiteTypography>
                                        </div>
                                        
                                    </Grid>
                            </Grid>
                            </Box> 
                        </Container>
                    </Box>
                    <Box fontSize={16}>
                    <Container>
                        <Typography component="h4" variant="h4" color="textPrimary" gutterBottom align="center">
                                        <strong>What is Artemis?</strong>
                        </Typography>
                        <Grid container style={{backgroundColor: "white", opacity: '1', padding: "20px"}} spacing={3} alignItems="center">
                                <Grid item md={6} xs={12}><Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                                    Introduction
                                </Typography>
                                    <Typography>
                                        As we are here in 2021. There are more and more volume in discussing climate change around the whole world. It is very distinct, but obvious that people focus the cause of this matter with carbon emission. Last year along, the world have emitted 36.44 billion metric tons of that. It is ultimately relatable and understandable, since carbon dioxide is reasoning to our current situation. But, looking back to these emission, really none of these emission are done naturally. Nearly all emission are done through human measure. Domestication, Deforestation, Industrialization, Power Generation, Habitual Emission. We are facing factors that are not removable from current society, except for one.
                                    </Typography></Grid>
                                <Grid item md={6} xs={12}><img style={{width:'90%', height:'auto', borderTopRightRadius: 20, borderTopLeftRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}} src={intro}></img></Grid>
                                <Grid item md={6} xs={12}><img style={{width:'90%', height:'auto', borderTopRightRadius: 20, borderTopLeftRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}} src={deforestation}></img></Grid>
                                <Grid item md={6} xs={12}><Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                                    <br></br>
                                    Collectivist in Deforestation
                                </Typography>
                                    <Typography>
                                        Deforestation is a one of the few carbon emitting factor humans us can deal with. But are we really making enough effort collectively? Ultimately, no. Which is sad. So, we here by to promote you to join us with our goal of contributing to climate change “Collectively”. By planting trees all around the world, we would be able to erase our carbon footprint step by step collectively as a whole. But this process cannot be achieved without the effort of everybody. We want you to join us to make a change.                            </Typography></Grid>
                                
                                <Grid item md={6} xs={6}><Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                                    <br></br>
                                    Our Goal
                                </Typography>
                                    <Typography>
                                        We are a collective group of being wishes you to make an effort for our response/support to the depressing scenario of climate change. We would like to you to be aware of you own carbon emission. If possible, we wish you to fund us to plant trees around the world.                             </Typography></Grid>
                                <Grid item md={2} sm={6}>
                                    <Icon classes={{root: classes.iconRoot}}>
                                    <img 
                                        src={SDG_imageA}>
                                    </img>
                                    </Icon>
                                </Grid>
                                <Grid item md={2} sm={6}>
                                    <Icon classes={{root: classes.iconRoot}}>
                                    <img 
                                        src={SDG_imageB}>
                                    </img>
                                    </Icon>
                                </Grid>
                                <Grid item md={2} sm={6}>
                                    {/* <Icon classes={{root: classes.iconRoot}}> */}
                                    <img 
                                        src={SDG_imageC} />
                                    {/* </Icon> */}
                                </Grid>
                                <Grid item md={6} xs={12}><img style={{width:'90%', height:'auto', borderTopRightRadius: 20, borderTopLeftRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}} src={method}></img></Grid>
                                <Grid item md={6} xs={12}><Typography component="h5" variant="h5" color="textPrimary" gutterBottom>
                                    <br></br>
                                    Methodology
                                </Typography>
                                    <Typography>
                                        Sign up today for yourself and the environment. Log your carbon emission day-by-day. Check if you are making more emission that the people around you. Aim to emit less and less for this world. To make contributions, you are able to donate for plant trees funded by your own hands!                            </Typography></Grid>
                                
                            </Grid>
                    </Container>
                    </Box>
                </Paper>
            </ThemeProvider>
        )
    }
}

export default withRouter(Home);