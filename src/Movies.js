import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import "./Movies.css";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import Filter from "./Filter";
import Modalfavoriteliste from "./Modalfavoriteliste";
import isEqual from "lodash/isEqual";
class Movies extends Component {
  static propTypes = {
    data_mv: PropTypes.array,
    FilterMovies: PropTypes.array,
    handelchange: PropTypes.func,
    search_value: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      favorit_movies: [],
      data_mv: this.props.data_mv
    };
    console.log("data.mv =========", props.data_mv);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.state.data_mv, nextProps.data_mv)) {
      this.setState({ data_mv: nextProps.data_mv });
    }
  }

  toggelModal = () => {
    this.setState({ show: !this.state.show });
  };

  handleChangeFilter(filter, date) {
    console.log("thispropsdata_mv", this.props.data_mv);
    console.log("-------------", filter, date);
    var { data_mv } = this.state;

    data_mv = data_mv.filter(item => {
      if (filter === "from") {
        return date <= item.release_date;
      } else {
        if (Filter === "to") {
          return item.release_date <= date;
        } else {
          return data_mv;
        }
      }
    });

    this.setState({ data_mv });
  }
  render() {
    const { handelchange, search_value } = this.props;
    var { data_mv } = this.state;

    console.log("FilterMovies", data_mv);

    return (
      <ul>
        <Modalfavoriteliste
          show={this.state.show}
          toggelModal={this.toggelModal}
        />
        {/* button list favorit */}
        <div>
          <Filter
            handleChangeFilter={(filter, date) =>
              this.handleChangeFilter(filter, date)
            }
          />

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
                      {console.log("movie.release_date", movie.release_date)}
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
