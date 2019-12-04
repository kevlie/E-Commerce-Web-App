import React, { Component } from "react";
import Item from "../Item/Item";

class ShoeProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoeCollection: [],
      isPremium: false
    };
  }

  changePremiumPrice() {
    if (this.state.isPremium) {
      this.state.shoeCollection.forEach(item => {
        item["price"] = item["price"] * 0.5;
      });
    }
  }
  componentDidMount() {
    fetch(
      "https://csc309-team19-api.herokuapp.com" +
        "/api/inventory?category=Shoes&ignoreImage=false",
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
          this.setState({ shoeCollection: json });
          console.log(this.state.shoeCollection);
        }
      });

    fetch("https://csc309-team19-api.herokuapp.com" + "/api/profile", {
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
        {this.state.shoeCollection.map(item => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

export default ShoeProducts;
