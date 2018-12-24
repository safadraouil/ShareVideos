import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Moviesinfo.css";
import { connect } from "react-redux";
import { handelclick_favorit } from "./actions/moviesActions";
import MoviesInfoIconnes from "./MoviesInfoIconnes";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

class Moviesinfo extends Component {
  static propTypes = {
    favorit_movies: PropTypes.array,
    id: PropTypes.string,
    movies: PropTypes.array,
    handelclick_favorit: PropTypes.func,
    picture: PropTypes.string
  };

  state = {
    data_mv_auth_info: [],
    nextId: "",
    backid: ""
  };
  async componentDidMount() {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.id
      }?api_key=9209bb756d7b55053d4c72ffd1f9ecc8&language=en-US`
    );
    let data_auth = await response.json();

    this.setState({
      data_mv_auth_info: data_auth.production_companies
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.nextId === this.state.nextId ||
      nextProps.backid === this.state.backid
    ) {
      window.location.reload();
    }
  }

  handelclick() {
    let { id } = this.props;
    this.props.handelclick_favorit(id);
  }

  render() {
    const { data_mv_auth_info } = this.state;
    const { favorit_movies, id, movies } = this.props;
    //const { nextId,backid} = this.state;

    let movieFilter =
      (movies && id && movies.filter(item => item.id === +this.props.id)) || [];
    let movie = (movieFilter.length && movieFilter[0]) || {};

    /* select movie from movies with the same id(from target value in app.js) */

    if (!movie || !movie.id) return <div>Loading ...</div>;

    for (var i = 0; i < movies.length; i++) {
      if (movies[i].id === +this.props.id) {
        var nextId = i + 1 < movies.length ? movies[i + 1].id : +this.props.id;
        var backid = i - 1 >= 0 ? movies[i - 1].id : +this.props.id;
      }
    }

    return (
      <div>
        {/*displaing movie information card*/}
        <ul className="ul1">
          <li key={movie.id} className="li1">
            <div className="card1">
              {movie.poster_path ? (
                <div>
                  <img
                    className="img1"
                    src={this.props.picture + movie.poster_path}
                    alt={movie.title}
                    key={movie.id}
                  />
                </div>
              ) : null}

              <div className="text1">
                <div>
                  <Link to="/">
                    <h2>{movie.title}</h2>
                  </Link>
                  <div>Puplish date : {movie.release_date}</div>
                </div>
                <br />
                <br />
                <br />
                <div>{movie.overview}</div>
                <i />
                <br />

                <MoviesInfoIconnes
                  handelclick={e => this.handelclick(e)}
                  name={favorit_movies.includes(id) ? "star" : "star outline"}
                />

                <br />
              </div>

              <div>
                <Link to={`/Moviesinfo/${backid}`}>
                  <Icon name="step backward" />
                </Link>
                <Link to={`/Moviesinfo/${nextId}`}>
                  <Icon name="step forward" />
                </Link>
              </div>
            </div>
          </li>
        </ul>
        {/*displaing production_companies*/}

        <ul className="ul_info1">
          {data_mv_auth_info.map((item, index) =>
            item.logo_path ? (
              <li key={index} className="li_info1">
                <div className="card_info1">
                  <div>
                    <img
                      className="img_info1"
                      src={this.props.picture + item.logo_path}
                      alt={item.picture}
                    />
                  </div>
                  <br />
                  <div className="text_info1">
                    <h2>{item.name}</h2>
                    <br />

                    <div>origin_country: {item.origin_country}</div>
                    <br />
                  </div>

                  <div />
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    );
  }
}

//redux configuration:
const mapStateToProps = state => {
  return {
    movies: state.childReducer.data_mv,
    favorit_movies: state.childReducer.favorit_movies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handelclick_favorit(id) {
      dispatch(handelclick_favorit(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Moviesinfo);
