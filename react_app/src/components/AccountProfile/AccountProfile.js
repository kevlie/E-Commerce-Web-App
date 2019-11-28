import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "semantic-ui-css/semantic.min.css";

import { Grid, Icon, Header, Message } from "semantic-ui-react";
import "./Profile.css";

class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstName: "default",
      lastName: "default",
      email: "default"
    };
  }

  componentDidMount() {
    // console.log(this.props.match.params.profileId);
    fetch("http://localhost:3001/api/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          this.props.history.push("/login");
        } else {
          this.setState({
            id: json._id,
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email
          });
        }
      });
  }

  //replace all infomations displaying with database calls later

  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, marginTop: "25vh" }}>
            <Header as="h2" style={{ color: "#5e35b1" }} textAlign="left">
              <Icon name="user" /> {this.state.firstName || ""}{" "}
              {this.state.lastName}
            </Header>
            <Header as="h2" style={{ color: "#29ABE2" }} textAlign="left">
              <Icon name="mail" /> {this.state.email}
            </Header>

            <Message
              className="message"
              onClick={() => {
                this.props.history.push(`/editProfile/${this.state.id}`);
              }}
            >
              Click here to edit your profile
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AccountProfile;
