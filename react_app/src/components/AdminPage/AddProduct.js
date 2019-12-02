import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import axios from "axios";

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
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("category", this.state.category);
    data.append("price", this.state.price);
    data.append("description", this.state.description);
    data.append("itemImage", this.state.image);
    axios
      .post("http://localhost:3001/api/inventory", data)
      .then(res => {
        if (res.status == 200) {
          this.setState({
            msg: "Item Added Successfully"
          });
        } else {
          this.setState({
            msg: "Item Added Unsuccessfully"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
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

            <p
              style={{
                marginTop: "25px"
              }}
            >
              Choose An Image
            </p>
            <Input
              style={{ width: 500, height: 30 }}
              id="standard-basic"
              type="file"
              onChange={e => {
                this.setState({
                  image: e.target.files[0]
                });
              }}
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
          </div>
        </div>
      </Container>
    );
  }
}
export default AddProduct;
