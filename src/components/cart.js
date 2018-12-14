import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as CardActions from "../actions/cart";
import Shelf from "./Shelf";

class Cart extends Component {
  constructor(props) {}
  render() {
    const CardItems = this.props.cart.map((item, idx) => {
      return <li Key={idx}>{item}</li>;
    });

    return (
      <div classeName="card">
        {" "}
        <Shelf addItem={this.props.action.assToCart} />
        <h2>Carditems</h2>
        <ol> {CardItems}</ol>
      </div>
    );
  }
}
function mapStateToProps(state, prop) {
  return { cart: state.cart };
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(CardActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
