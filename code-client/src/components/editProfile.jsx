import React from "react";
import { withRouter } from "react-router";
import { Container, FormHelperText, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(5),
        width: '40ch',
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

const classes = useStyles;


class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
        };
    }
    componentDidMount() {
        this.requestUserData();
    }

    onChangeUserName(component,value){
        this.setState({username:value})
    }
    onChangeEmail(component,value){
        this.setState({email:value})
    }
    onChangeLastName(component,value){
        this.setState({last_name:value})
    }
    onChangeFirstName(component, value){
        this.setState({first_name:value})
    }

    handleEdit() {
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
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
            })
        };
        
        console.log(this.state.first_name)
        console.log("Requesting User data for Editing Profile");

        fetch('http://localhost:8000/api-login/edit-profile', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    requestUserData() {
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
        console.log("Requesting User data for Editing Profile");

        fetch('http://localhost:8000/api-login/edit-profile', requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    username: data['username'],
                    email: data['email'],
                    first_name: data['first_name'],
                    last_name: data['last_name'],
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
        <Container maxWidth="lg">
        <Box mt={5}>
            <h1>User Profile</h1>
        </Box>
        <Box mt={5}>
            
        </Box>
        <Box mt={5}>
            <Grid container className={classes.root} >
                <Grid item sm={6} xs={12} align="center">
                <form noValidate autoComplete="off">
                <FormControl>
                <Typography format="h1">
                <strong>User Basic Profile Settings</strong>
                </Typography>
                <TextField
                required
                id="first_name"
                name="first_name"
                label="First Name"
                value={this.state.first_name}
                onChange={this.onChangeFirstName.bind(this)}
                >
                </TextField>
                <TextField
                    required
                    id="last_name"
                    name="last_name"
                    label="Last Name" 
                    value={this.state.last_name}
                    onChange={this.onChangeLastName.bind(this)}
                >
                </TextField>
                <FormHelperText>
                    You can edit your real name to display to others.
                </FormHelperText>
                <Button onClick={this.handleEdit} color="primary"
                 >Confirm Changes
                     </Button>
                </FormControl>
                </form>

                </Grid>
                <Grid item sm={6} xs={12}>

                <FormControl>
                <Typography format="h1">
                <strong>Locked Profile Info</strong>
                </Typography>
                <TextField
                    id="filled-read-only-input"
                    label="Username" 
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={this.state.username}
                    onChange={this.onChangeUserName.bind(this)}
                >
                </TextField>
                <TextField
                    id="filled-read-only-input"
                    label="Email"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    value={this.state.email}
                    onChange={this.onChangeEmail.bind(this)}
                >
                </TextField>
                </FormControl>
                </Grid>
                
            </Grid>      
        </Box>
        </Container>
        )
    }
}

export default withRouter(EditProfilePage)