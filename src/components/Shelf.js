import React, { Component } from "react";

class Shelf extends Component {
  constructor(props) {
    this.onClickAdd = this.onClickAdd.bind(this);
    this.state = {
      shelfItems: ["sahmpo", "chocolat"]
    };
  }
  onClickAdd(item) {
    this.props.addItem(item);
  }
  render() {
    const shelfItems = this.shelfItems.map((item, idx) => {
      return (
        <li Key={idx}>
          <button onClick={() => this.onClickAdd(item)}>[+]</button>
        </li>
      );
    });
    return <ul>{shelfItems}</ul>;
  }
}
export default Shelf;
