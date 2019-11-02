import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./NavBar.css";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import logo from "../../images/newshop.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import sign_in from "../../redux/actions.js";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

class NavBar extends Component {
  render() {
    // const isLoggedIn = useSelector(state => state.isLoggedIn);
    return (
      <AppBar
        position="static"
        style={{ backgroundColor: "lightblue", padding: 10 }}
      >
        <Toolbar>
          <div className="left-navbar">
            <img
              src={logo}
              alt={"Logo"}
              className="logo"
              onClick={() => {
                this.props.history.push("/");
              }}
            />
          </div>
          <div className="right-navbar">
            {!this.props.isLoggedIn ? (
              <Button
                variant="outlined"
                style={{ marginRight: 20 }}
                color="primary"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Log in
              </Button>
            ) : (
              <Button
                variant="outlined"
                style={{ marginRight: 20 }}
                color="primary"
                onClick={() => {
                  this.props.dispatch(sign_in());
                }}
              >
                Log out
              </Button>
            )}
            <IconButton>
              {/* change badgecontent to number of items in cart */}
              <Badge badgeContent={1} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withRouter(connect(mapStateToProps)(NavBar));
