// import React from 'react';
import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import UserTable from "./UserTable.js";

class AdminPage extends Component {
  render() {
    return (
      <Container component="main">
        <UserTable/>
      </Container>
    );
  }
}

export default AdminPage;
