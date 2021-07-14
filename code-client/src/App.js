import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, NavBar, SignIn, SignUp, Dashboard, Logout, Donation, CarbonEntryPage, Contactus, GreenEntryPage, EditProfilePage
 } from "./components";
import { withRouter } from "react-router";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

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
  console.log("sending POST request");
  console.log(localStorage.getItem("Authentication"))

  fetch('http://localhost:8000/api-login/auth-check', requestOptions)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          localStorage.setItem('isLoggedIn', true)
          localStorage.setItem('isAuthenticated', true)
          const status = localStorage.getItem('isLoggedIn')
          console.log(status)
          if (status) {
            return  <Route path="/dashboard" exact component={() => <Dashboard/>} />
          }
      })
      .catch(error => {
          console.log(error);
          localStorage.setItem('isLoggedIn', false)
          localStorage.setItem('isAuthenticated', false)
      });
}

function App() {
  useEffect(() => {
    checkLogin();
}, []); 
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={()=> <Home/>}/>
          <Route path="/signin" exact component={() => <SignIn />} />
          <Route path="/signup" exact component={() => <SignUp />} />
          <Route path="/dashboard" exact component={() => <Dashboard/>} />
          <Route path="/logout" exact component={() => <Logout/>} />
          <Route path="/carbonEntryPage" exact component={() => <CarbonEntryPage/>} />
          <Route path="/greenEntryPage" exact component={() => <GreenEntryPage/>} />
          <Route path="/donation" exact component={() => <Donation/>} />
          <Route path="/contactus" exact component={() => <Contactus/>} />
          <Route path="/profile" exact component={()=> <EditProfilePage/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;