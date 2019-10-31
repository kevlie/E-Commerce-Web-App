import React, { Component } from "react";
import Item from "../Item/Item";
import shoeProduct from "../ShoesData.js";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoeCollection: shoeProduct
    };
  }

  render() {
    return (
      <div>
        {this.state.shoeCollection.map(item => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

export default Products;
