import React, {Component} from "react";
import "./NavBar.css";
import Button from "@material-ui/core/Button";
import logo from "../../images/newshop.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {withRouter} from "react-router-dom";
import ShoppingCartBar from "../ShoppingCartBar/ShoppingCartBar";
import {connect} from "react-redux";
import {sign_in} from "../../redux/actions.js";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "default",
      isAdmin: false
    };
  }
  handleLogin() {
    fetch("http://localhost:3001/api/users/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          // this.props.history.push("/login");
        } else {
          this.setState({
            firstName: json.firstName,
            isAdmin: json.isAdmin
          });
        }
      });
  }
  handleLogout() {
    fetch("http://localhost:3001/api/users/logout", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then(res => {
      if (res.status === 200) {
        this.props.dispatch(sign_in());
        this.props.history.push("/");
        console.log("in");
      }
    });
  }

  render() {
    this.handleLogin();
    return (
      <AppBar
        position="sticky"
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
              <div>
                Signed in as {this.state.firstName}
                <Button
                  variant="outlined"
                  style={{ marginRight: 20 }}
                  color="primary"
                  onClick={() => {
                    if (this.state.isAdmin) {
                      this.props.history.push("/adminPage");
                    } else {
                      this.props.history.push("/profile");
                    }
                  }}
                >
                  Profile
                </Button>
                <Button
                  variant="outlined"
                  style={{ marginRight: 20 }}
                  color="primary"
                  onClick={() => {
                    this.handleLogout();
                  }}
                >
                  Log out
                </Button>
              </div>
            )}
          </div>
          <ShoppingCartBar />
        </Toolbar>
      </AppBar>
    );
  }
}
export default withRouter(connect(mapStateToProps)(NavBar));
