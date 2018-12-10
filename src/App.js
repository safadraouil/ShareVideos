import React, { Component } from "react";
import Movies from "./Movies";
import Hello from "./Hello";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Router } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Movies path="/" />
          <Hello path="Hello/:id" />
        </Router>
      </div>
    );
  }
}

export default App;
