import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import "./item.css";

class ConnectedItem extends Component {
  render() {
    return (
      <Card
        style={{ width: 300, height: 300, margin: 20, display: "inline-block" }}
      >
        <CardActionArea>
          <CardMedia className="cardMedia" image={this.props.item.imageUrls} />
          <CardContent>
            <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {this.props.item.name}
            </div>
            <div style={{ margin: 5 }}>Price: ${this.props.item.price}</div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default ConnectedItem;
