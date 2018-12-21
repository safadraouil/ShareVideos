import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import React, { Component } from "react";
import { handelclick_favorit } from "./actions/moviesActions";
import PropTypes from "prop-types";
class Modalfavoriteliste extends Component {
  static propTypes = {
    id: PropTypes.string,
    handelchange: PropTypes.func,
    search_value: PropTypes.string,
    favorit_movies: PropTypes.array,
    toggelModal: PropTypes.func,
    movies: PropTypes.array,
    show: PropTypes.bool
  };
  handelclick(id) {
    /*if (typeof id !== "string") id = `${id}`;
    let { favorit_movies } = this.props;
    let favorit_movies_props = [...favorit_movies];
    if (favorit_movies && favorit_movies.includes(id)) {
      favorit_movies_props = this.props.favorit_movies.filter(
        item => item !== id
      );
    } else {
      favorit_movies_props.push(id);
    }*/
    this.props.handelclick_favorit(id);
    // this.componentWilfavorit_movies
  }

  render() {
    let movies = [];
    if (
      this.props.favorit_movies &&
      this.props.favorit_movies.length &&
      this.props.movies
    ) {
      movies = this.props.movies.filter(item =>
        this.props.favorit_movies.includes(`${item.id}`)
      );
    }

    return (
      <div>
        <ul>
          <div>
            <Modal
              open={this.props.show}
              onOpen={this.props.toggelModal}
              onClose={this.props.toggelModal}
              size="small"
            >
              <Modal.Header>Favorite List Movies</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Header>Modal Header</Header>
                  <p>Favorite List Movies 2018</p>
                </Modal.Description>
                <div>
                  <ul>
                    <li>
                      {movies
                        ? movies.map(movie => (
                            <div key={movie.id}>
                              {movie.title}
                              <Icon
                                onClick={e => this.handelclick(movie.id)}
                                name={
                                  this.props.favorit_movies.includes(movie.id)
                                    ? "star"
                                    : "star outline"
                                }
                              />{" "}
                            </div>
                          ))
                        : null}
                    </li>
                  </ul>
                </div>
              </Modal.Content>

              <Modal.Actions>
                <Button onClick={this.props.toggelModal}>close /></Button>
              </Modal.Actions>
            </Modal>
          </div>
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
)(Modalfavoriteliste);
