import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {withRouter} from "react-router-dom";
import "./Register.css";
import accountData from "../AccountData.js";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "default",
      password: "default",
      firstName: "default",
      lastName: "default",
      fail: false
    };
  }
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={e => {
                    this.setState({
                      firstName: e.target.value.toString()
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={e => {
                    this.setState({
                      lastName: e.target.value.toString()
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e => {
                    this.setState({
                      email: e.target.value.toString()
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={e => {
                //replace with database call later
                if (
                  this.state.email !== "default" &&
                  this.state.password !== "default" &&
                  this.state.firstName !== "default" &&
                  this.state.lastName !== "default"
                ) {
                  accountData.push({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                  });
                  this.props.history.push("/login");
                } else {
                  this.setState({
                    fail: true
                  });
                }
              }}
            >
              Sign Up
            </Button>
            {this.state.fail && <div style={{ color: "red" }}>Error</div>}
          </form>
        </div>
      </Container>
    );
  }
}

export default withRouter(Register);
