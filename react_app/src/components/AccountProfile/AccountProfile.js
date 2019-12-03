import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "semantic-ui-css/semantic.min.css";
import { withRouter } from "react-router-dom";
import { Grid, Header, Icon, Message } from "semantic-ui-react";
import "./Profile.css";

class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstName: "default",
      lastName: "default",
      email: "default",
      isPremium: false,
      fail: false
    };
  }
  handlePremium() {
    fetch("http://localhost:3001/api/profile/edit", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        isPremium: true
      })
    }).then(res => {
      if (res.status === 500) {
        this.setState({
          fail: true
        });
      }
    });
  }

  componentDidMount() {
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
            email: json.email,
            isPremium: json.isPremium
          });
        }
      });
  }

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
            <Button
              onClick={() => {
                this.setState({ isPremium: true });
                this.handlePremium();
              }}
              style={{ width: 300 }}
            >
              Become a Premium Member
            </Button>
            {this.state.isPremium && (
              <div style={{ color: "red" }}>
                Thank you for being a premium member!
              </div>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withRouter(AccountProfile);
