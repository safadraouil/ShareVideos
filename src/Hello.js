import React, { Component } from "react";
import { Link } from "@reach/router";
//import Movies from "./Movies";

class Hello extends Component {
  render() {
    return (
      <Link to="/">
        <h1>Hello! :)</h1>
      </Link>
    );
  }
}

export default Hello;
