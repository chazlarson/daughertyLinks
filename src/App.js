import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Close from "./components/Close";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/close" component={Close} />
        </div>
      </Router>
    );
  }
}

export default App;
