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
  componentDidMount() {
    // console.log(this.props.match.params.profileId);
    fetch(
      "http://localhost:3001/api/inventory?category=Shoes&ignoreImage=false",
      {
        method: "GET",
        credentials: "include"
      }
    )
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          console.log("none");
          // this.props.history.push("/login");
        } else {
          console.log(json);
          json.forEach(item => {
            item["image"] ="data:image/jpg;base64, ".concat(item["image"]);
          });
          this.setState({ shoeCollection: json });
          console.log(this.state.shoeCollection);
          // this.setState({
          //   isPremium: json.isPremium
          // });
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.shoeCollection.map(item => {
          console.log(item.image)
          return <Item key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

export default ShoeProducts;
