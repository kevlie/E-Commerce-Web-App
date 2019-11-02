import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import "./item.css";

class Item extends Component {
  render() {
    return (
      <Card className="item">
        <CardActionArea>
          <CardMedia className="cardMedia" image={this.props.item.imageUrls} />
          <CardContent>
            <div className="itemName">{this.props.item.name}</div>
            <div className="price">Price: ${this.props.item.price}</div>
          </CardContent>
        </CardActionArea>
        <CardActions className="addItem" onClick={()=>this.props.addToCart(this.props.item.id)}>
          <div>Add to Cart</div>
        </CardActions>
      </Card>
    );
  }
}

export default Item;
