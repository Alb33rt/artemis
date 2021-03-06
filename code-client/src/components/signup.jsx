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
import { Theme } from '../colorTheme';
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";


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

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick.bind(this);
    this.state = {
      userName: "",
      emailAddress: "",
      password: "",
      password2: "",
      token: "",
      isLoaded: false,
    }
  }

  afterSubmission(event) {
    event.preventDefault();
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
  setWithExpiry(key, value) {
    const now = new Date()
    const item = {
      value: value,
      expiry: now.getTime() + (60*60*1000),
    }
    localStorage.setItem(key, JSON.stringify(item))
  }
  handleClick = () => {
    return this.props.setLoginState();
  }
  postRequest(e) {
    e.preventDefault()
    const { history } = this.props;
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
    console.log("Registering User by Creating a Profile in the API");

    fetch('http://localhost:8000/api-login/register', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.handleClick();
        this.setState({
          token: data['token']
        })
        if (!data['token']) {
          toast.warn("Registration failure. Please try again.")
          return false
        }
        this.setWithExpiry("Authentication", "Token " + data['token']);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('isLoggedIn', true);
        toast.success("You have successfully registered! You are now redirected to the Login.")
        history.push("/dashboard");
      })
      .catch(error => {
        this.handleClick();
        console.log(error);
        toast.warn("Registration failure. Please try again.")
      });
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper} style={{ marginTop: "40%" }}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box mt={1}>
            </Box>
            <form className={classes.form} noValidate onSubmit={this.afterSubmission.bind(this)}>
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
                    value={this.state.userName}
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
                    value={this.state.emailAddress}
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
                    value={this.state.password}
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
                    value={this.state.password2}
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
                onClick={this.postRequest.bind(this)}
                onSubmit={this.afterSubmission.bind(this)}
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
export default withRouter(SignUp);