import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import "./Movies.css";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

import Modalfavoriteliste from "./Modalfavoriteliste";

class Movies extends Component {
  static propTypes = {
    data_mv: PropTypes.array,
    handelchange: PropTypes.func,
    search_value: PropTypes.string
  };

  state = { show: false, favorit_movies: [] };
  toggelModal = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    const { data_mv, handelchange, search_value } = this.props;

    return (
      <ul>
        <Modalfavoriteliste
          show={this.state.show}
          toggelModal={this.toggelModal}
        />
        <div>
          <Icon disabled name="list" onClick={this.toggelModal} />
        </div>

        {/*input search movies*/}
        <input
          className="input"
          type="text"
          placeholder="Search.."
          onChange={e => handelchange(e)}
          value={search_value}
        />
        {/*search movies from input movies*/}
        {data_mv &&
          data_mv.map(movie => (
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
                    <button className="ui circular facebook icon button">
                      <i className="facebook icon" />
                    </button>
                    <button className="ui circular twitter icon button">
                      <i className="twitter icon" />
                    </button>
                    <button className="ui circular linkedin icon button">
                      <i className="linkedin icon" />
                    </button>
                    <button className="ui circular google plus icon button">
                      <i className="google plus icon" />
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
