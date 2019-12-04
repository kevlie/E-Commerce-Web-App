import React, { Component } from "react";
import Item from "../Item/Item";

class WatchProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchCollection: [],
      isPremium: false
    };
  }
  changePremiumPrice() {
    if (this.state.isPremium) {
      this.state.watchCollection.forEach(item => {
        item["price"] = item["price"] * 0.5;
      });
    }
  }

  componentDidMount() {
    fetch(
        (process.env.REMOTE ? "https://csc309-team19-processapi.herokuapp.com" : "localhost:3001")
        + "/api/inventory?category=Watches&ignoreImage=false",
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
          json.forEach(item => {
            item["image"] = "data:image/jpg;base64, ".concat(item["image"]);
          });
          this.setState({ watchCollection: json });
          console.log(this.state.watchCollection);
        }
      });

    fetch("http://localhost:3001/api/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
        } else {
          this.setState({
            isPremium: json.isPremium
          });
        }
      });
  }

  render() {
    this.changePremiumPrice();
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
