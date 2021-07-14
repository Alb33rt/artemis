import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import { Home, NavBar, SignIn, SignUp, Dashboard, carbonEntryPage, Logout } from "./components";
=======
import { Home, NavBar, SignIn, SignUp,Dashboard,carbonEntryPage, donation } from "./components";
>>>>>>> 1bf70d07971c79bcabd6fbac4df2e6a7d062f046

function App() {
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