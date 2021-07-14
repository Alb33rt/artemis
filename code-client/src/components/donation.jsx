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

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);


    return (
        <ThemeProvider theme={Theme}>
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Donate to Plant a Tree
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Checkout
                        </Typography>
                        <React.Fragment>
                            <React.Fragment>
                                <Typography variant="h6" gutterBottom>
                                    Donation details
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First name"
                                            fullWidth
                                            autoComplete="given-name"
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="expireYear"
                                            name="expireYear"
                                            label="Expiration Year"
                                            fullWidth
                                            autoComplete="off"
                                            type="number"
                                            step="1" 
                                            InputProps={{ inputProps: { min: 1900, max: 2099 } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select
                                            fullWidth
                                            displayEmpty
                                            name="expireMonth"
                                            className={classes.selectEmpty}
                                            label="Expiration Month"
                                        >
                                            <MenuItem value="">
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
                                        fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="donation"
                                            name="donation"
                                            label="Donation Amount"
                                            fullWidth
                                            type="number"
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
                    <Copyright />
                </main>
            </React.Fragment>
        </ThemeProvider>
    );
}