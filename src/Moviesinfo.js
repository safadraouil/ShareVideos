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
    data_mv_auth: [],
    data_mv_auth_info: []
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

  /*componentWillReceiveProps(nextProps) {
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
  }*/

  handelclick() {
    let { id } = this.props;
    this.props.handelclick_favorit(id);
  }

  render() {
    const { data_mv_auth, data_mv_auth_info } = this.state;
    const { favorit_movies, id, movies } = this.props;

    let movieFilter =
      (movies && id && movies.filter(item => item.id === +this.props.id)) || [];
    let movie = (movieFilter.length && movieFilter[0]) || {};

    /* select movie from movies with the same id(from target value in app.js) */

    if (!movie || !movie.id) return <div>Loading ...</div>;

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
                  name={favorit_movies.includes(id) ? "star" : "star outline"}
                />

                <br />
              </div>
              <div>
                {" "}
                <Link to="/Moviesinfo/424783">
                  <Icon name="step backward" />
                </Link>
                <Link to="/">
                  <Icon name="step forward" />
                </Link>
              </div>

              <div />
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
