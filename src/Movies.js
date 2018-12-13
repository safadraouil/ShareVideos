import React, { Component } from "react";
// import '../semantic/dist/semantic.min.css';
import "semantic-ui-css/semantic.min.css";
import "./Movies.css";
import { Link } from "@reach/router";

class Movies extends Component {
  render() {
    const { data_mv, handelchange, search_value } = this.props;

    return (
      <ul>
        {/*input search movies*/}
        <input
          className="input"
          type="text"
          placeholder="Search.."
          onChange={e => handelchange(e)}
          value={search_value}
        />
        {/*search movies from input movies*/}
        {data_mv.map(movie => (
          <li key={movie.id}>
            <div className="card">
              <div className="img">
                {/*link whene click in picture and send id in url*/}
                <Link to={`/Hello/${movie.id}`}>
                  {/*picture :url ,poster_path : api variable*/}
                  <img
                    src={this.props.picture + movie.poster_path}
                    alt={movie.title}
                    key={movie.id}
                  />
                </Link>
              </div>
              {/*display title + overiew  */}
              <div className="text">
                <div>
                  {/* id of current movie */}
                  <Link to={`/Moviesinfo/${movie.id}`}>
                    <h2>{movie.title}</h2>
                    <div>Puplish date : {movie.release_date}</div>
                  </Link>
                </div>
                <br />

                <div>{movie.overview}</div>
                <div className="button_circular">
                  <button class="ui circular facebook icon button">
                    <i class="facebook icon" />
                  </button>
                  <button class="ui circular twitter icon button">
                    <i class="twitter icon" />
                  </button>
                  <button class="ui circular linkedin icon button">
                    <i class="linkedin icon" />
                  </button>
                  <button class="ui circular google plus icon button">
                    <i class="google plus icon" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Movies;
