import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, NavBar, SignIn, SignUp, Dashboard, CarbonEntryPage, Logout, Donation } from "./components";
import AuthContext from "./auth-context.js";

const UserContext = React.createContext('logged_out')

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
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
          <Route path="/donation" exact component={() => <Donation/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;