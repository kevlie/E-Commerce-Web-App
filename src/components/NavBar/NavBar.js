import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./NavBar.css";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import logo from "../../images/newshop.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

class NavBar extends Component {
  render() {
    return (
      <AppBar
        position="static"
        style={{ backgroundColor: "lightblue", padding: 10 }}
      >
        <Toolbar>
          <div className="left-part">
            <img
              src={logo}
              alt={"Logo"}
              style={{ marginLeft: 10, height: 60 }}
            />
          </div>
          <div className="right-part">
            <Button
              variant="outlined"
              style={{ marginRight: 20 }}
              color="primary"
            >
              Log in
            </Button>
            <IconButton>
              <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
export default NavBar;
