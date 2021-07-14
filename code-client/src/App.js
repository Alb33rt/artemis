import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, NavBar, SignIn, SignUp,Dashboard,carbonEntryPage, donation } from "./components";

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
          <Route path="/carbonEntryPage" exact component={() => <carbonEntryPage/>} />
          <Route path="/donation" exact component={() => <donation/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;