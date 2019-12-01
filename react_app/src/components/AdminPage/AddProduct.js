import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import { connect } from "react-redux";
// import Item from "../Item/Item";

import SimplePopover from './Popover.js';

class AddProduct extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            //get item and set state
        };
      }
    render() {
      return (
        <Container component="main">
        <div style={{ padding: 30 }}>
        <Typography variant="h2" gutterBottom>
        Add More Products!
       </Typography>
       </div>

       <div style={{ padding: 10 }}>
       <div
            style={{
              flex: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "column"
            }} >

      <TextField style={{ width: 300, marginTop: 15 , height: 50}} 
      id="standard-basic" label="Name" />

     <TextField style={{ width: 300, marginTop: 15 , height: 50}} 
      id="standard-basic" label="Category" />


     <TextField style={{ width: 150, marginTop: 15 , height: 50}} 
      id="standard-basic" label="Price" />   

     <TextField style={{ width: 500, marginTop: 15 , height: 50}} 
      id="standard-basic" label="Descriptions" /> 
    
     <TextField style={{ width: 500, marginTop: 15 , height: 50}} 
      id="standard-basic" label="Image URL" /> 

       <Button style={{ width: 200, marginTop: 15 , height: 50}} variant="contained" color="primary">
        Add Product
       </Button>

       <SimplePopover>

       </SimplePopover>
       </div>
       </div>
        </Container>
        
      );
    }
  }
export default AddProduct;
