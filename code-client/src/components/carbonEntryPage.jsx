import React from "react";
import { useEffect, useState } from "react";
import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Theme } from "../colorTheme";
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
export default function CarbonEntryPage() {
    let item = []
    let itemList = []
    let unitList = []
    const [itemListFinal, setItemListFinal] = useState(itemList);
    const [unitListFinal, setUnitListFinal] = useState(unitList);
    const [itemObjectList, setItemObjectList] = useState(item);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);
    const [detail, setDetail] = React.useState("");
    const [unit, setUnit] = React.useState("");
    const [chosedItem, setChosedItem] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function postEntry() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Request-Method": "POST",
                "Origin": "https://127.0.0.1:3000",
                "Authorization": localStorage.getItem("Authentication"),
                'x-csrftoken': csrftoken
            },
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({
                "quantity": quantity,
                "details": detail,
                "item_involved": chosedItem['name'],
            })
        };
        console.log("Creating Carbon Entry through the API");

        fetch('http://localhost:8000/api-carbon/create-carbon', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
        setOpen(false);
        setQuantity(0);
        setDetail("");
        setChosedItem("");
    }
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
        console.log("Retrieving Carbon Items through the API");
        console.log(itemObjectList)

        fetch('http://localhost:8000/api-carbon/all-carbon-item', requestOptions)
            .then(response => response.json())
            .then(data => {
                item = data
                console.log(item)
                let names = [];
                let id = [];
                for (let i = 0; i < item.length; i++) {
                    names.push(item[i]['name']);
                    id.push(item[i]['id']);
                    unitList.push(item[i]['unit']);
                }
                setUnitListFinal(unitList);
                let result = []
                for (let i = 0; i < item.length; i++) {
                    var dict = {}
                    dict['name'] = names[i];
                    dict['id'] = id[i];
                    result.push(dict)
                }
                itemList = result
                setItemListFinal(itemList);
                setItemObjectList(data)
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
            <Box mt={7}>
                <Container maxWidth="lg">

                    <Grid container spacing={10}>
                        <Grid item xs={7}>
                            <img style={{ width: '100%', height: 'auto', opacity: '0.9' }} src={log}></img>
                        </Grid>
                        <Grid item md={4} xs={8}>
                            <Typography component="h2" variant="h2" color="textPrimary" gutterBottom>
                                Carbon Entry
                            </Typography>
                            <Typography>
                                Make your ???Carbon Entry???! Log in your activities to keep track of the amount of impact you are bringing to society. This submission will be logged into your account as collective data. Make sure you are comfortable of these submissions. But ultimately, we hope you are making less and less submissions over time. You will be able to view how these entries contribute to your routine. And calculations will be available to show how much of contribution you should make for the society via planting trees. We await for your awakening to the realization of this urgent world crisis.
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
                                            value={chosedItem}
                                            onChange={(event, newValue) => { setChosedItem(newValue); setUnit("Quantity (" + unitListFinal[itemListFinal.indexOf(newValue)] + ")") }}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="normal"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            label={unit}
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
                                        <Button onClick={postEntry} variant="contained" color="primary">
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