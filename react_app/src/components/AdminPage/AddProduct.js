import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import { connect } from "react-redux";
// import Item from "../Item/Item";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      msg: "test"
    };
  }

  handleAddItem() {
    // fetch("http://localhost:3001/api/inventory", {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   credentials: "include",
    //   body: {
    //     name: data.name,
    //     category: this.state.category,
    //     price: this.state.price,
    //     description: this.state.description,
    //     image: this.state.image
    //   }
    // }).then(res => {
    //   if (res.status === 200) {
    //     this.state.msg = "Item Added Successfully";
    //   } else {
    //     this.state.msg = "Item Added Unsuccessfully";
    //   }
    // });
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
            }}
          >
            <TextField
              style={{ width: 300, marginTop: 15, height: 50 }}
              id="standard-basic"
              label="Name"
              onChange={e => {
                this.setState({
                  name: e.target.value
                });
              }}
            />

            <TextField
              style={{ width: 300, marginTop: 15, height: 50 }}
              id="standard-basic"
              label="Category (Watches or Shoes)"
              onChange={e => {
                this.setState({
                  category: e.target.value
                });
              }}
            />

            <TextField
              style={{ width: 150, marginTop: 15, height: 50 }}
              id="standard-basic"
              label="Price"
              onChange={e => {
                this.setState({
                  price: e.target.value
                });
              }}
            />

            <TextField
              style={{ width: 500, marginTop: 15, height: 50 }}
              id="standard-basic"
              label="Description"
              onChange={e => {
                this.setState({
                  description: e.target.value
                });
              }}
            />

            <TextField
              style={{ width: 500, marginTop: 15, height: 50 }}
              id="standard-basic"
              label="Image URL"
            />

            <Button
              style={{ width: 200, marginTop: 15, height: 50 }}
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleAddItem();
              }}
            >
              Add Product
            </Button>
            <p>{this.state.msg}</p>
          </div>
        </div>
      </Container>
    );
  }
}
export default AddProduct;
