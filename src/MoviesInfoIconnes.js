import React from "react";
import { Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

const MoviesInfoIconnes = props => {
  const { handelclick, name } = props;
  return (
    <div>
      <Icon onClick={e => handelclick(e)} name={name} />

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

      <div className="ui labeled button" tabIndex="0">
        <div className="ui red button">
          <i className="heart icon" /> Like
        </div>
        <a href="./Hello.js" className="ui basic red left pointing label">
          1,048
        </a>
      </div>
      <div className="ui labeled button" tabIndex="0">
        <div className="ui basic blue button">
          <i className="fork icon" /> Forks
        </div>
        <a href="./Hello.js" className="ui basic left pointing blue label">
          1,048
        </a>
      </div>
      <br />
    </div>
  );
};

MoviesInfoIconnes.propTypes = {
  classe_name: PropTypes.string,
  handelclick: PropTypes.func
};

export default MoviesInfoIconnes;
