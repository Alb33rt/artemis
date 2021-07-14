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
import { Theme } from "../colorTheme";
import ReactDOM from "react-dom";

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
class CarbonEntryPage extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <ThemeProvider theme={Theme}>
                <Container maxWidth="1g">
                <Paper elevation={0} />
                    <Grid container>
                        <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            <br></br>
                            Introduction
                        </Typography>
                            <Typography>
                                hihi
                            </Typography></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            <br></br>
                            Collectivist in Deforestation
                        </Typography>
                            <Typography>
                            Deforestation </Typography></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            <br></br>
                            Our Goal
                        </Typography>
                            <Typography>
                            We are </Typography></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            <br></br>
                            Methodology
                        </Typography>
                            <Typography>
                            Sign up </Typography></Grid>
                        <Grid item xs={6}></Grid>
                    </Grid>
                    <Paper />
                </Container>
            </ThemeProvider>
        );
    }
}

export default CarbonEntryPage;