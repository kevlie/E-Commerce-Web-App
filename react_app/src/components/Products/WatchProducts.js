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

  componentDidMount() {
    // console.log(this.props.match.params.profileId);
    fetch(
      "http://localhost:3001/api/inventory?category=Watches&ignoreImage=false",
      {
        method: "GET",
        credentials: "include"
      }
    )
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          console.log("none");
        } else {
          console.log(json);
          this.setState({ watchCollection: json });
          this.state.watchCollection.map(item => {
            item["image"] = "data:image/jpg;base64, " + item["image"];
          });
          console.log(this.state.watchCollection);
        }
      });
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
