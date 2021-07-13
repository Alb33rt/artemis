import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {theme} from '../colorTheme';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const classes = useStyles;

export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      emailAddress: "",
      password: "",
      password2: ""
    }
  }

  getUserName(input) {
    this.setState({
      userName: input.target.value
    })
  }
  getEmail(input) {
    this.setState({
      emailAddress: input.target.value
    })
  }
  getPassword(input) {
    this.setState({
      password: input.target.value
    })
  }
  getPassword2(input) {
    this.setState({
      password2: input.target.value
    })
  }

  postTokenRequest(e){
    fetch("http://localhost:8000/api-login/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": this.state.emailAddress,
        "username": this.state.userName,
        "password": this.state.password,
        "password2": this.state.password2
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(json => {
        this.setState({
          isLoaded: true,
          token: json
        });
      })
      .catch(error => console.error(error));
  }
  

  postRequest(e) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Request-Method": "POST"
      },
      body: JSON.stringify({
        "email": this.state.emailAddress,
        "username": this.state.userName,
        "password": this.state.password,
        "password2": this.state.password2
      })
    };
    e.preventDefault()
    console.log("sending POST request");
    
    fetch('http://localhost:8000/api-login/register', requestOptions)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} style={{marginTop:"40%"}}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  value={this.userName}
                  onChange={this.getUserName.bind(this)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.emailAddress}
                  onChange={this.getEmail.bind(this)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.password}
                  onChange={this.getPassword.bind(this)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="Confirm Password"
                  value={this.password2}
                  onChange={this.getPassword2.bind(this)}
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.postTokenRequest.bind(this)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
        </Box>
      </Container>
      </ThemeProvider>
    );
  }
}
