import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import "./item.css";
import { ADD_ITEM } from "../../redux/actions";
import { connect } from "react-redux";

class Item extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isPremium: false
    // };
  }
  // componentDidMount() {
  //   // console.log(this.props.match.params.profileId);
  //   fetch("http://localhost:3001/api/profile", {
  //     method: "GET",
  //     credentials: "include"
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       if (json === null) {
  //         // this.props.history.push("/login");
  //       } else {
  //         this.setState({
  //           isPremium: json.isPremium
  //         });
  //       }
  //     });
  // }
  render() {
    return (
      <Card className="item">
        <CardActionArea>
          <CardMedia
            onClick={() => console.log("hi")}
            className="cardMedia"
            src={this.props.item.image}
          />
          <CardContent>
            <div className="itemName">{this.props.item.name}</div>
            <div className="price">Price: ${this.props.item.price}</div>
          </CardContent>
        </CardActionArea>
        <CardActions
          className="addItem"
          onClick={() => {
            this.props.dispatch(ADD_ITEM(this.props.item));
          }}
        >
          <div>Add to Cart</div>
        </CardActions>
      </Card>
    );
  }
}

export default connect()(Item);
