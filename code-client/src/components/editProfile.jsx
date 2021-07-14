import React from "react";
import { withRouter } from "react-router";
import { Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { ThemeConsumer } from "styled-components";
import TextField from '@material-ui/core/TextField';

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

class EditProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
        }

    }

    componentDidMount() {  
        this.requestUserData();
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
                console.log(data);
                this.setState({
                    username: data['username'],
                    email: data['email'],
                    first_name: data['first_name'],
                    last_name: data['last_name'],
                })
                console.log(this.state)
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        return (
        <Container>
           <Box mt={2}>
            <TextField
            required
            id="standard-basic"
            label="First Name"
            variant="standard"
            >
            </TextField>
            <TextField
                required
                id="standard-basic"
                label="Last Name" 
                variant="standard"
            >
            </TextField>
            <TextField
                id="filled-read-only-input"
                label="Username" 
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            >
            </TextField>
            <TextField
                id="filled-read-only-input"
                label="Email"
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            >
            </TextField>
        </Box>
        </Container>
        )
    }
}

export default withRouter(EditProfilePage)