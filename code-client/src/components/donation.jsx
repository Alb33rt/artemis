import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Theme } from "../colorTheme";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from "react";
import { Container } from '@material-ui/core';
import NatureTwoToneIcon from '@material-ui/icons/NatureTwoTone';


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
}));

export default function Checkout() {
    function afterSubmission(event) {
        event.preventDefault();
    }

    function postRequest(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "POST"
            },
            body: JSON.stringify({
                "firstname":firstName,
                "lastname":lastName,
                "credit_card_number":creditNum,
                "expiration_year":expireYear,
                "expiration_month":expireMonth,
                "confirm_code":confirmCode,
                "quantity":donation
            })
        };
        console.log("sending POST request");

        fetch('http://localhost:8000/api-login/register', requestOptions)
          .then(response=>response.json())
          .then(data => {console.log(data)
          })
          .catch(error => {
            console.log(error);
        });
    }

    const [firstName, getFirstName] = useState("");
    const [lastName, getLastName] = useState("");
    const [creditNum, getCreditNum] = useState("");
    const [expireYear, getExpireYear] = useState("");
    const [expireMonth, getExpireMonth] = useState("");
    const [confirmCode, getConfirmCode] = useState("");
    const [donation, getDonation] = useState("");

    const classes = useStyles();
    return (
        <ThemeProvider theme={Theme}>
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Container max-width="lg">
                        <Typography variant="h6" color="inherit" noWrap>
                            <NatureTwoToneIcon></NatureTwoToneIcon>
                            Donate to Plant a Tree
                        </Typography>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="sm"> 
                <paper elevation={3}>
                    <Typography variant="h7" gutterBottom>
                        <br></br>
                        <br></br>
                        Make your “Donation” towards helping this planet! Believing that you have glance through the data we provided, you are convinced to make donation to helps us planting more trees. This is a good start of making contributions. Imaging everybody are making donations to contribute, it would be utopian but the ultimate goal. Promote the call to action to the people around you. Collectivist (sounds alike to communism but is not) towards contributing to save the planet starts here!
                    </Typography>
                </paper>
                </Container>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Donation
                            <br></br>
                        </Typography>
                        <React.Fragment>
                            <React.Fragment>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First name"
                                            fullWidth
                                            autoComplete="given-name"
                                            value={firstName}
                                            onChange={(e) => getFirstName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastName"
                                            name="lastName"
                                            label="Last name"
                                            fullWidth
                                            autoComplete="family-name"
                                            value={lastName}
                                            onChange={(e) => getLastName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="creditNum"
                                            name="creditNum"
                                            label="Credit Card Number"
                                            fullWidth
                                            autoComplete="off"
                                            type="number"
                                            value={creditNum}
                                            onChange={(e) => getCreditNum(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="expireYear"
                                            name="expireYear"
                                            label="Expiration Year and Month"
                                            fullWidth
                                            autoComplete="off"
                                            type="number"
                                            step="1"
                                            InputProps={{ inputProps: { min: 1900, max: 2099 } }}
                                            value={expireYear}
                                            onChange={(e) => getExpireYear(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select
                                            fullWidth
                                            displayEmpty
                                            name="expireMonth"
                                            className={classes.selectEmpty}
                                            label="Expiration Month"
                                            value={expireMonth}
                                            onChange={(e) => getExpireMonth(e.target.value)}
                                        >
                                            <MenuItem value={0}>
                                                <em>Select Month</em>
                                            </MenuItem>
                                            <MenuItem value={1}>January</MenuItem>
                                            <MenuItem value={2}>February</MenuItem>
                                            <MenuItem value={3}>March</MenuItem>
                                            <MenuItem value={4}>April</MenuItem>
                                            <MenuItem value={5}>May</MenuItem>
                                            <MenuItem value={6}>June</MenuItem>
                                            <MenuItem value={7}>July</MenuItem>
                                            <MenuItem value={8}>August</MenuItem>
                                            <MenuItem value={9}>September</MenuItem>
                                            <MenuItem value={10}>October</MenuItem>
                                            <MenuItem value={11}>November</MenuItem>
                                            <MenuItem value={12}>December</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="confirmCode"
                                            name="confirmCode"
                                            label="Confirmation Code"
                                            value={confirmCode}
                                            onChange={(e) => getConfirmCode(e.target.value)}
                                            fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="donation"
                                            name="donation"
                                            label="Donation Amount (NTD)"
                                            fullWidth
                                            type="number"
                                            value={donation}
                                            onChange={(e) => getDonation(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                            <React.Fragment>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Send
                                    </Button>
                                </div>
                            </React.Fragment>
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        </ThemeProvider>
    );
}