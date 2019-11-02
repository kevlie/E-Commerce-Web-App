import React, { Component } from "react";
import Item from "../Item/Item";
import shoeData from "../ShoesData.js";

class ShoeProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoeCollection: shoeData
    };
  }

  render() {
    return (
      <div>
        {this.state.shoeCollection.map(item => {
          return <Item key={item.id} item={item} addToCart={this.props.addToCart} />;
        })}
      </div>
    );
  }
}

export default ShoeProducts;
