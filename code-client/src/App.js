import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Home, NavBar, SignIn, SignUp, Dashboard, Logout, Donation, CarbonEntryPage, Contactus, GreenEntryPage, EditProfilePage
 } from "./components";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       'Montserrat',
//     ].join(','),
//   },});


function checkLogin() {
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
        credentials: "include"
    };
    console.log("Requesting Authentication from API");
    console.log(`Current User Login Status: ${localStorage.getItem('isLoggedIn')}`)

    fetch('http://localhost:8000/api-login/auth-check', requestOptions)
        .then(response => response.json())
        .then(data => {

          localStorage.setItem('isLoggedIn', true)
          localStorage.setItem('isAuthenticated', true)

          if (!localStorage.getItem("Authentication")) {
            console.log("System detected that user is not logged in. Authentication Failed.")
            localStorage.setItem('isLoggedIn', false)
            localStorage.setItem('isAuthenticated', false)
            toast.info("Please login to use the app.")
            return false
          } else {
            console.log("System has authenticated user, you are free to redirect to any page.")
            toast.info("Your Artemis app has your login saved and will automatically signin when you open the app.")
            return true
          } 
        })
        .catch(error => {
            console.log(error);
            localStorage.setItem('isLoggedIn', false)
            localStorage.setItem('isAuthenticated', false)
            console.log('Authentication Error')
            return false
        });
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setLoginState.bind(this);
    this.state = {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
    }
  }

  setLoginState() {
    this.setState({isLoggedIn:localStorage.getItem('isLoggedIn')})
  }

  // shouldComponentUpdate() {
  //   checkLogin()
  //   console.log(this.state.isLoggedIn)
  //   this.render();
  // //   console.log(`Updating 1 Login State: ${this.state.isLoggedIn}`);
  // // //   return false
  // }
  componentDidUpdate() {
    console.log("Loading App... (Updating)")
  }

  componentDidMount() {
    checkLogin();
    this.setLoginState();
    console.log("Loading App... (Mounting)")
  }

  render() {
    let isLoggedIn = false
    if (localStorage.getItem('isLoggedIn') === "true") {
      isLoggedIn = true;
    }
    console.log(`Updating Login State: ${isLoggedIn}`);

    return (
    <div className="App">
      <ToastContainer draggable={false} transition={Zoom}/>
      <Router>
        <NavBar setLoginState={this.setLoginState.bind(this)}/>
        <Switch>
          <Route path="/" exact component={()=> <Home/>}/>
          <Route path="/signin" exact component={() => <SignIn setLoginState={this.setLoginState.bind(this)}/>} />
          <Route path="/signup" exact component={() => <SignUp setLoginState={this.setLoginState.bind(this)}/>} />
          <Route path="/dashboard">
            { isLoggedIn ? <Dashboard /> : <Redirect to="/signin" /> }
          </Route>
          <Route path="/logout" exact component={() => 
          <Logout setLoginState={this.setLoginState.bind(this)}/>  }
           />
          <Route path="/carbonEntryPage">
            { isLoggedIn ? <CarbonEntryPage /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/greenEntryPage">
            { isLoggedIn ? <GreenEntryPage /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/donation">
            { isLoggedIn ? <Donation /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/contactus" exact component={() => <Contactus/>} />
          <Route path="/profile">
            { isLoggedIn ? <EditProfilePage /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </Router>
    </div>
    )
  };
}

export default App;