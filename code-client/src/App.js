import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, NavBar, SignIn, SignUp, Dashboard, Logout, donation, CarbonEntryPage
 } from "./components";
import AuthContext from "./auth-context.js";

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

  fetch('http://localhost:8000/api-carbon/logs', requestOptions)
      .then(response => response.json())
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.log(error);
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
          <Route path="/carbonEntryPage" exact component={() => <carbonEntryPage/>} />
          <Route path="/donation" exact component={() => <donation/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;