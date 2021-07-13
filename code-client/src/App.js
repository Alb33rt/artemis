import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { navBar, SignIn, SignUp } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <navBar />
        <Switch>
          <Route path="/signin" exact component={() => <SignIn />} />
          <Route path="/signup" exact component={() => <SignUp />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;