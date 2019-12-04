import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import "./Login.css";
import { withRouter } from "react-router-dom";
import { sign_in } from "../../redux/actions.js";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "default",
      password: "default",
      fail: false
    };
  }

  handleLogin() {
    let uri;
    if (process.env.NODE_ENV === "production") {
      uri = "https://csc309-team19-api.herokuapp.com"
    } else {
      uri = "http://localhost:3001"
    }
    fetch(uri + "/api/auth/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        if (res.status === 400) {
          this.setState({
            fail: true
          });
        } else {
          this.props.dispatch(sign_in());
          this.props.history.push("/");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div className="paper">
          {/* <Typography component="h1" variant="h5" font='"Product Sans", serif'>
            Sign in
          </Typography> */}
          <h1>Sign in</h1>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => {
                this.setState({
                  email: e.target.value.toString()
                });
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => {
                this.setState({
                  password: e.target.value.toString()
                });
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={e => {
                this.handleLogin();
              }}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              color="primary"
              className="submit"
              onClick={() => {
                this.props.history.push("/register");
              }}
            >
              Don't have an account? Sign Up
            </Button>
            {this.state.fail && <div style={{ color: "red" }}>Error</div>}
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Login));
