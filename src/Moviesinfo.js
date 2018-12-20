import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Moviesinfo.css";
import { connect } from "react-redux";
import { handelclick_favorit } from "./actions/moviesActions";
//import { Icon } from "semantic-ui-react";
import { isEqual } from "lodash";
import MoviesInfoIconnes from "./MoviesInfoIconnes";
import { stringify } from "querystring";
import PropTypes from "prop-types";

class Moviesinfo extends Component {
  static propTypes = {
    favorit_movies: PropTypes.array.isrequired,
    id: PropTypes.string.isrequired,
    movies: PropTypes.object.isrequired,
    handelclick_favorit: PropTypes.func.isrequired,
    picture: PropTypes.string.isrequired
  };

  state = {
    data_mv_auth: [],
    data_mv_auth_info: [],
    classe_name: this.props.favorit_movies.includes(this.props.id)
      ? "star"
      : "star outline",
    delete_from_favorit_movies: [],
    value: {},
    movie:
      (this.props.movies &&
        this.props.id &&
        this.props.movies.filter(item => item.id === +this.props.id)) ||
      []
  };
  async componentDidMount() {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.id
      }?api_key=9209bb756d7b55053d4c72ffd1f9ecc8&language=en-US`
    );
    let data_auth = await response.json();

    this.setState({
      data_mv_auth: data_auth,
      data_mv_auth_info: data_auth.production_companies
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.id !== this.props.id ||
      (nextProps.movies && !this.props.movies)
    )
      this.setState({
        movie:
          (nextProps.movies &&
            nextProps.id &&
            nextProps.movies.filter(item => item.id === +nextProps.id)) ||
          []
      });

    // Check when favorite movie change
    let { favorit_movies, id } = this.props;
    let { favorit_movies: nextFavorit_movies } = nextProps;
    let classe_name;

    if (!isEqual(favorit_movies, nextFavorit_movies)) {
      nextFavorit_movies.includes(id)
        ? (classe_name = "star")
        : (classe_name = "star outline");
      this.setState({ classe_name });
    }
  }

  handelclick() {
    let { favorit_movies, id } = this.props;
    let favorit_movies_props = [...favorit_movies];
    if (favorit_movies && favorit_movies.includes(id)) {
      favorit_movies_props = this.props.favorit_movies.filter(
        item => item !== id
      );
    } else {
      favorit_movies_props.push(id);
    }
    this.props.handelclick_favorit(favorit_movies_props);
    // this.componentWilfavorit_movies
  }

  render() {
    const { id, favorit_movies } = this.props;
    const {
      data_mv_auth,
      data_mv_auth_info,
      movie: movieArray,
      classe_name
    } = this.state;
    let movie = movieArray[0];
    /* select movie from movies with the same id(from target value in app.js) */

    console.log("favorit_movies", favorit_movies);
    console.log("id", id);
    if (!movie || !movie.id) return <div>...</div>;

    return (
      <div>
        {/*displaing movie information card*/}
        <ul className="ul1">
          <li key={data_mv_auth.id} className="li1">
            <div className="card1">
              {data_mv_auth.poster_path ? (
                <div>
                  <img
                    className="img1"
                    src={this.props.picture + data_mv_auth.poster_path}
                    alt={data_mv_auth.title}
                    key={data_mv_auth.id}
                  />
                </div>
              ) : null}

              <div className="text1">
                <div>
                  <Link to="/">
                    <h2>{data_mv_auth.title}</h2>
                  </Link>
                  <div>Puplish date : {data_mv_auth.release_date}</div>
                </div>
                <br />
                <br />
                <br />
                <div>{data_mv_auth.overview}</div>
                <i />
                <br />

                <MoviesInfoIconnes
                  handelclick={e => this.handelclick(e)}
                  name={classe_name}
                />

                <br />
              </div>

              <div />
            </div>
          </li>
        </ul>
        {/*displaing production_companies*/}

        <ul className="ul_info1">
          {data_mv_auth_info.map((item, index) =>
            item.logo_path ? (
              <li
                key={index}
                className="li_info1"
                /* style={{
                background: `url(${this.props.picture +
                  data_mv_auth.backdrop_path})`
              }} */
              >
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
    handelclick_favorit(favorit_movies) {
      dispatch(handelclick_favorit(favorit_movies));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Moviesinfo);
