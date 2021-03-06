import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Theme } from '../colorTheme';
import { withRouter } from "react-router";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const classes = useStyles;

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick.bind(this)
    this.state = {
      emailAddress: "",
      username: "",
      password: "",
      token: "",
      isAuthenticated: false,
      redirect: "/signin",
      rememberMe: false
    }
  }
  afterSubmission(event) {
    event.preventDefault();
  }
  getUsername(input) {
    this.setState({
      username: input.target.value
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
  getRememberMe(input) {
    this.setState({
      rememberMe: input.target.checked
    })
  }
  handleClick = () => { 
    this.props.setLoginState();
  }

  setWithExpiry(key, value) {
    const now = new Date()
    const item = {
      value: value,
      expiry: now.getTime() + (60*60*1000),
    }
    localStorage.setItem(key, JSON.stringify(item))
  }
  postRequest(e) {
    e.preventDefault();
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
        "username": this.state.username,
        "password": this.state.password,
      })
    };
    console.log("Signing in User through the API");

    fetch('http://localhost:8000/api-login/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({
          token: data['token']
        })
        localStorage.setItem("Authentication", "Token " + data['token']);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('isLoggedIn', true);

        if (data['token']) {
          toast.success("You are logged in!");
          this.handleClick();
          history.push('/dashboard')
        } else {
          console.log("Login Failed, please double check your Username or Password.") 
          localStorage.setItem('isLoggedIn', false)
        }
      })
      .catch(error => {
        console.log(error);
        this.handleClick();
        toast.warn("Error. Please Try Again. Or check your Username & Password as they may be incorrect")
      });
  }
  renderRedirect() {
    if (this.state.isAuthenticated && this.state.redirect) {
      console.log("Redirecting to Home")
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: "/dashboard"
    })
  }
  render() {
    console.log("rendering...")
    return (
      <ThemeProvider theme={Theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper} style={{ marginTop: "50%" }}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.afterSubmission.bind(this)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={this.state.username}
                onChange={this.getUsername.bind(this)}
              />
              <TextField
                variant="outlined"
                margin="normal"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                onChange={this.getRememberMe.bind(this)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.postRequest.bind(this)}
              >

                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withRouter(SignIn);