import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import "./Profile.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "default",
      password: "default",
      first_name: "default",
      last_name: "default",
      fail: false
    };
  }
  componentDidMount() {
    let uri;
    if (process.env.NODE_ENV === "production") {
      uri = "https://csc309-team19-api.herokuapp.com"
    } else {
      uri = "http://localhost:3001"
    }
    fetch(uri + "/api/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          this.props.history.push("/login");
        } else {
          this.setState({
            first_name: json.firstName,
            last_name: json.lastName,
            email: json.email,
            password: json.password
          });
        }
      });
  }
  handleUpdate() {
    let uri;
    if (process.env.NODE_ENV === "production") {
      uri = "https://csc309-team19-api.herokuapp.com"
    } else {
      uri = "http://localhost:3001"
    }
    fetch(uri + "/api/profile/edit", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.first_name,
        lastName: this.state.last_name
      })
    }).then(res => {
      if (res.status === 500) {
        this.setState({
          fail: true
        });
      } else {
        // this.props.dispatch(sign_in());
        this.props.history.push("/");
      }
    });
  }
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div className="title">
          {/* <Typography component="h1" variant="h5">
            Edit your Profile
          </Typography> */}
          <h1>Edit your Profile</h1>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              name="firstName"
              id="email"
              label="First Name"
              onChange={e => {
                this.setState({
                  first_name: e.target.value.toString()
                });
              }}
            />

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              name="lastName"
              id="lastName"
              label="Last Name"
              onChange={e => {
                this.setState({
                  last_name: e.target.value.toString()
                });
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={e => {
                this.setState({
                  email: e.target.value.toString()
                });
              }}
            />

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              type="password"
              id="password"
              label="Password"
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
                this.handleUpdate();
                //replace with database calls later
              }}
            >
              Save
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

export default EditProfile;
