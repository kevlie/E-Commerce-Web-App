import React, { Component } from "react";
import "./NavBar.css";
import Button from "@material-ui/core/Button";
import logo from "../../images/logo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import ShoppingCartBar from "../ShoppingCartBar/ShoppingCartBar";
import { connect } from "react-redux";
import { sign_in, CLEAR_CART } from "../../redux/actions.js";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      anchorEl: null,
      firstName: "default",
      isAdmin: false
    };
  }
  handleLogin() {
    fetch("https://csc309-team19-api.herokuapp.com" + "/api/profile/", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
        } else {
          this.setState({
            id: json._id,
            firstName: json.firstName,
            isAdmin: json.isAdmin
          });
        }
      });
  }
  handleLogout() {
    fetch("https://csc309-team19-api.herokuapp.com" + "/api/auth/logout", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then(res => {
      if (res.status === 200) {
        this.props.dispatch(sign_in());
        this.props.dispatch(CLEAR_CART());
        this.props.history.push("/");
      }
    });
  }

  handleIsLoggedIn() {
    fetch("https://csc309-team19-api.herokuapp.com" + "/api/auth/isLoggedIn", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(res => {
        if (res.status === 200) {
          this.props.dispatch(sign_in());
        }
      })
      .catch(() => {
        console.log("error");
      });
  }

  componentWillMount() {
    this.handleIsLoggedIn();
  }

  render() {
    let { anchorEl } = this.state;
    this.handleLogin();
    return (
      <AppBar
        position="sticky"
        style={{
          background: "linear-gradient(to right bottom, #2E3B55, #82ffa1)",
          padding: 10
        }}
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
                style={{ marginRight: 20, background: "#BAD1E7" }}
                color="primary"
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Log in
              </Button>
            ) : (
              <div>
                Signed in as {this.state.firstName}
                <Avatar
                  onClick={event => {
                    this.setState({ anchorEl: event.currentTarget });
                  }}
                  style={{ backgroundColor: "#3f51b5", marginRight: 20 }}
                >
                  <Person />
                </Avatar>
              </div>
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  if (this.state.isAdmin) {
                    this.props.history.push("/adminPage");
                  } else {
                    this.props.history.push(`/profile/${this.state.id}`);
                  }
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
          {this.props.isLoggedIn && !this.state.isAdmin ? (
            <ShoppingCartBar />
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
export default withRouter(connect(mapStateToProps)(NavBar));
