import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./Profile.css";

class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "default",
      lastName: "default",
      email: "default",
      password: "default"
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/users/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          this.props.history.push("/login");
        } else {
          this.setState({
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
      <Container component="main" maxWidth="xs">
        <div className="title">
          <Typography component="h1" variant="h5">
            Account Profile
          </Typography>

          <form className="form" noValidate>
            <div className="form">
              <div class="MuiPaper-root MuiPaper-elevation1 jss14 MuiPaper-rounded">
                <h2
                  class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary 
            MuiTypography-gutterBottom"
                >
                  First Name:
                </h2>
                <p
                  class="MuiTypography-root jss279 MuiTypography-body1 MuiTypography-col
            orTextSecondary"
                >
                  {this.state.firstName}
                </p>

                <h2
                  class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary 
            MuiTypography-gutterBottom"
                >
                  Last Name:
                </h2>
                <p
                  class="MuiTypography-root jss279 MuiTypography-body1 MuiTypography-col
            orTextSecondary"
                >
                  {this.state.lastName}
                </p>

                <h2
                  class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary 
            MuiTypography-gutterBottom"
                >
                  Email Address:
                </h2>
                <p
                  class="MuiTypography-root jss279 MuiTypography-body1 MuiTypography-col
            orTextSecondary"
                >
                  {this.state.email}
                </p>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              color="primary"
              className="submit"
              onClick={() => {
                this.props.history.push("/editProfile");
              }}
            >
              Edit My Account Profile
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

export default AccountProfile;
