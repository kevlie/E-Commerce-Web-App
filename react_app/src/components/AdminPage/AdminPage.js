// import React from 'react';
import React,{ Component } from "react";
import Container from "@material-ui/core/Container";
import OderTable from './OderTable.js'
import UserTable from './UserTable.js'

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class AdminPage extends Component {
    render() {
      return (
        <Container component="main">
            <OderTable>
            </OderTable>
            
            <UserTable>
            </UserTable>

        </Container>
        
      );
    }
  }
  
  export default AdminPage;

