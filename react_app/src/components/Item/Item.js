import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import "./item.css";
import { ADD_ITEM } from "../../redux/actions";
import { connect } from "react-redux";

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("this is the image" + this.props.item.image);
    return (
      <Card className="item">
        <CardActionArea>
          <CardMedia className="cardMedia" image={this.props.item.image} />

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
        <CardContent className="addItem">
          <PopupState variant="popover" popupId="demo-popup-popover">
            {popupState => (
              <div>
                <div {...bindTrigger(popupState)}>Details</div>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                >
                  <Box p={2}>
                    <Typography>
                      Description: {this.props.item.description}
                    </Typography>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        </CardContent>
      </Card>
    );
  }
}

export default connect()(Item);
