import React, { Component } from "react";
// import '../semantic/dist/semantic.min.css';
import "semantic-ui-css/semantic.min.css";
import "./Movies.css";
import { Link } from "@reach/router";

const KEY = "9209bb756d7b55053d4c72ffd1f9ecc8";
const API = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1%60`;
const PICTURE = `https://image.tmdb.org/t/p/w300_and_h450_bestv2/`;

class Movies extends Component {
  state = {
    result: "",
    data_mv_all: [],
    data_mv: [],
    code_key: ""
  };

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

  handelchange(e) {
    let { value } = e.target;
    let { data_mv_all } = this.state;
    let data_mv_res = data_mv_all.filter(
      obj =>
        obj.title.toLowerCase().includes(value.toLowerCase()) ||
        obj.overview.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ data_mv: data_mv_res });
  }

  render() {
    const { data_mv } = this.state;
    console.log("data_mv", data_mv);

    return (
      <ul>
        <input
          className="input"
          type="text"
          placeholder="Search.."
          onChange={e => {
            this.handelchange(e);
          }}
        />

        {data_mv.map(movie => (
          <li key={movie.id}>
            <div className="card">
              <div className="img">
                <Link to={`/Hello/${movie.id}`}>
                  <img
                    src={PICTURE + movie.poster_path}
                    alt={movie.title}
                    key={movie.id}
                  />
                </Link>
              </div>

              <div className="text">
                <div>
                  {" "}
                  <h2>{movie.title}</h2>
                </div>
                <br />
                <div>Puplish date : {movie.release_date}</div>
                <div>{movie.overview}</div>
                <br />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Movies;
