import React from "react";
import { useEffect,useState } from "react";
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import log from '../images/logging.jpg'
import { Box } from "@material-ui/core";
import green from '../images/green.png'

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
export default function GreenEntryPage() {
    const [itemListFinal,setItemListFinal]=useState(itemList);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState("");
    const [detail, setDetail] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    var item=[]
    var nameList=[]
    var itemList=[]

    function getItems() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "GET",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include"
        };
        console.log("get items");

        fetch('http://localhost:8000/api-carbon/all-item', requestOptions)
            .then(response => response.json())
            .then(data => {
                item = data
                var names = [];
                var id = [];
                for (let i = 0; i < item.length; i++) {
                    names.push(item[i]['name']);
                    id.push(item[i]['id']);
                }
                nameList=names
                var result=[]
                for (let i = 0; i < item.length; i++) {
                    var dict={}
                    dict['name']=names[i];
                    dict['id']=id[i];
                    result.push(dict)
                }
                itemList=result
                setItemListFinal(itemList);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <ThemeProvider theme={Theme}>
            <Box m={7}>
            <Container maxWidth="1g">
                
                <Grid container spacing={10}>
                    <Grid item xs={7}>
                        <img style={{width:'100%', height:'auto', opacity:'0.9'}} src={green}></img>
                    </Grid>
                    <Grid item md={4} xs={8}>
                        <Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                            Green Entry
                        </Typography>
                        <Typography>
                        Looking at all your carbon emissions. Your should be committing more work to neutralize the impact you have bring along. This Green Entry Log would be where you log what kind of activities you have made contributions to. We wish all users to adapt the habit to increase the amount of Green Activities your deed executes. Come on, use the log to tell us your good deeds to the world. We trust that you are honest while logging, and wish to receive more and more Green Entries from you.
                        </Typography>
                        <Grid fullWidth classes={{ root: classes.root }}>
                    <Box m={10}></Box>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Create New Carbon Entry
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create New Entry</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter details about your entry</DialogContentText>
                        <Autocomplete
                            id="item"
                            options={itemListFinal}
                            autoHighlight
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Item Type" variant="outlined" />}
                        />
                        <TextField
                            autoFocus
                            margin="normal"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            label="Quantity"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="normal"
                            value={detail}
                            onChange={(e) => setDetail(e.target.value)}
                            label="Details"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
                    </Grid>
                    

                </Grid>
                
            </Container>
            </Box>
        </ThemeProvider>
    );
}