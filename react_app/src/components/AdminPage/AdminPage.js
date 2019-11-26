// import React from 'react';
import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import OderTable from "./OderTable.js";
import UserTable from "./UserTable.js";

class AdminPage extends Component {
  render() {
    return (
      <Container component="main">
        {/* <OderTable></OderTable> */}

        <UserTable></UserTable>
      </Container>
    );
  }
}

export default AdminPage;
