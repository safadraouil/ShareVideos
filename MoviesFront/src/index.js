import React from "react";
import ReactDOM from "react-dom";
import "bootswatch/dist/cerulean/bootstrap.min.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./index.css";
import Navbar from "./Navbar";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { disableReactDevTools } from "@fvilers/disable-reactdevtools";

/* import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/cerulean/bootstrap.min.css";
//import "bootstrap/scss/bootstrap";
//import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import * as serviceWorker from "./serviceWorker"; */

if (process.env.NODE_ENV === "production") disableReactDevtools();

ReactDOM.render(
  <React.Fragment>
    <Navbar>
      <App />
    </Navbar>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
