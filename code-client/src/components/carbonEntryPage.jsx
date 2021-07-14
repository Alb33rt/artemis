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
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box } from "@material-ui/core";

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



export default function CarbonEntryPage() {
    const classes = useStyles;
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState([]);
    const [text, setText] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setValues([]);
    };
    const handleChangeText = (e) => {
        setText(e.target.value);
    };
    const addValue = () => {
        setValues([...values, ""]);
    };
    const handleValueChange = (index, e) => {
        values[index] = e.target.value;
        console.log(values);
        setValues(values);
    };
    const deleteValue = (jump) => {
        setValues(values.filter((j) => j !== jump));
    };
    return (
        <ThemeProvider theme={Theme}>
            <Container maxWidth="1g">
                <Paper elevation={0} />
                <Grid container>
                    <Grid item xs></Grid>
                    <Grid item xs={6}><Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                        <br></br>
                        Carbon Entry
                    </Typography>
                        <Typography>
                            Make your “Carbon Entry”! Log in your activities to keep track of the amount of impact you are bringing to society. This submission will be logged into your account as collective data. Make sure you are comfortable of these submissions. But ultimately, we hope you are making less and less submissions over time. You will be able to view how these entries contribute to your routine. And calculations will be available to show how much of contribution you should make for the society via planting trees. We await for your awakening to the realization of this urgent world crisis.
                        </Typography></Grid>
                    <Grid item xs></Grid>

                </Grid>
                <Paper />
            </Container>
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Create
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">New Dialog</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Sample Text.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={text}
                            onChange={handleChangeText}
                            label="Text"
                            fullWidth
                        />
                        {values.map((jump, index) => (
                            <Box key={"jump" + index}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item xs={10}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Value"
                                            value={jump || ""}
                                            onChange={(e) => handleValueChange(index, e)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div
                                            className="font-icon-wrapper"
                                            onClick={() => deleteValue(jump)}
                                        >
                                            <IconButton aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </DialogContent>
                    <Button onClick={addValue} color="primary">
                        Add
                    </Button>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}