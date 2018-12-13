import React, { Component } from "react";
import Movies from "./Movies";
import Hello from "./Hello";
import Moviesinfo from "./Moviesinfo";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Router } from "@reach/router";

const KEY = "9209bb756d7b55053d4c72ffd1f9ecc8";
const API = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1%60`;

const PICTURE = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/`;

class App extends Component {
  state = {
    result: "",
    data_mv_all: [],
    data_mv: [],
    code_key: "",
    search_value: ""
  };
  /* return data from api in componentDidMount*/

  async componentDidMount() {
    /*  fetch(API)
  .then(response=>response.json())
      .then(data => this.setState({data_mv : data.slice(0,10) }))*/

    let response = await fetch(API);
    let data = await response.json();

    this.setState({
      data_mv: data.results.slice(0, 10),
      data_mv_all: data.results.slice(0, 10)
    });
  }

  /* return movies whene title equal input string  */
  handelchange(e) {
    let { value } = e.target;
    let { data_mv_all } = this.state;
    let data_mv_res = data_mv_all.filter(
      obj =>
        obj.title.toLowerCase().includes(value.toLowerCase()) ||
        obj.overview.toLowerCase().includes(value.toLowerCase())
    );

    /* search_value : to send id in the props  */
    this.setState({ data_mv: data_mv_res, search_value: value });
  }
  render() {
    const { search_value, data_mv, data_mv_all } = this.state;

    return (
      <div className="App">
        <Router>
          {/* id : value of current target from handelchange 
          handelchange : to send handelchange in the props
          */}
          <Movies
            path="/"
            search_value={search_value}
            data_mv={data_mv}
            handelchange={e => this.handelchange(e)}
            picture={PICTURE}
          />
          <Hello path="Hello/:id" />

          <Moviesinfo
            path="Moviesinfo/:id"
            movies={data_mv_all}
            picture={PICTURE}
          />
        </Router>{" "}
      </div>
    );
  }
}

export default App;
