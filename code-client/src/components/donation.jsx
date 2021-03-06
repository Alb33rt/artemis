import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme } from "../colorTheme";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from "react";
import { Box, Container } from '@material-ui/core';
import NatureTwoToneIcon from '@material-ui/icons/NatureTwoTone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Frog from '../images/frog.jpg'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Redirect } from 'react-router';
import { toast } from 'react-toastify';


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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const SubmitDonation = (props) => {
    const properties = props
    const [open, setOpen] = React.useState(false);
    const [donated, setDonation] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function handleAgree(props) {
        if (!properties.firstname || !properties.lastname || !properties.creditNum || !properties.expiration_year || !properties.expiration_month || !properties.confirm_code || !properties.quantity) {
            toast.warn("The credentials entered caused an error. Please double check if you entered the correct values.")
            setOpen(false);
            return false
        }
        const history = props.history;
        setOpen(false);
        console.log(properties)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "POST",
                "Origin": "http://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            body: JSON.stringify({
                "firstname": properties.firstname,
                "lastname": properties.lastname,
                "credit_card_number": properties.creditNum,
                "expiration_year": properties.expiration_year,
                "expiration_month": properties.expiration_month,
                "confirm_code": properties.confirm_code,
                "quantity": properties.quantity,
            })
        };
        console.log("Sending Credentials to API");

        fetch('http://localhost:8000/api-donation/donate', requestOptions)
          .then(response=>response.json())
          .then(data => {
              console.log(data)
              console.log("Donation Completed. We are processing your purchase, it will take 2 work days for it to complete.")
              window.alert("Thank you for your donation!")
              setDonation(true);
          })
          .catch(error => {
            console.log(error);
        });
    };
    if (donated) {
        return <Redirect to="/dashboard" />
    }
    return (
      <div>
        <Box m={10}></Box>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Confirm Donate
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Donation to Artemis?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure about donating to Peko?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleAgree} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default function Checkout() {
    const { history } = useHistory();

    const [firstName, getFirstName] = useState("");
    const [lastName, getLastName] = useState("");
    const [creditNum, getCreditNum] = useState("");
    const [expireYear, getExpireYear] = useState("");
    const [expireMonth, getExpireMonth] = useState("");
    const [confirmCode, getConfirmCode] = useState("");
    const [donation, getDonation] = useState("");

    useEffect(() => {
        if(!localStorage.getItem('isLoggedIn')) { 
            history.push('/');
        }
    })

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
                <Box m={10}></Box>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <Container>
                            <img style={{width:'100%', height:'auto', opacity:'0.8'}} src={Frog}></img>
                            <Box m={3}>
                            <Typography variant="h6" gutterBottom>
                                Make your ???Donation??? towards helping this planet! Believing that you have glance through the data we provided, you are convinced to make donation to helps us planting more trees. This is a good start of making contributions. Imaging everybody are making donations to contribute, it would be utopian but the ultimate goal. Promote the call to action to the people around you. Collectivist (sounds alike to communism but is not) towards contributing to save the planet starts here!
                            </Typography>
                            </Box>
                        </Container>
                    </Grid>
                    <Grid item xs={4}>
                    <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Box m={3}>
                        <Typography component="h1" variant="h4" align="center">
                            Donation
                            <br></br>
                        </Typography>
                        <React.Fragment>
                            <React.Fragment>
                                <Grid container spacing={5}>
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
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={postRequest}
                                    >
                                        Send
                                    </Button> */}
                                    <SubmitDonation 
                                    firstname={firstName}
                                    lastname={lastName}
                                    creditNum={creditNum}
                                    expiration_year={expireYear}
                                    expiration_month={expireMonth}
                                    confirm_code={confirmCode}
                                    quantity={donation}
                                      />
                                </div>
                            </React.Fragment>
                        </React.Fragment>
                        </Box>
                    </Paper>
                </main>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </React.Fragment>
        </ThemeProvider>
    );
}