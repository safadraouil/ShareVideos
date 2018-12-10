import React, { Component } from "react";
import Movies from "./Movies";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Movies />
      </div>
    );
  }
}

export default App;
