import React, { Component } from "react";
import Item from "../Item/Item";
import watchData from "../WatchesData.js";

class WatchProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchCollection: watchData
    };
  }

  render() {
    return (
      <div>
        {this.state.watchCollection.map(item => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

export default WatchProducts;
