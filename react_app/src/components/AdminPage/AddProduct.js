import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      category: "",
      price: "",
      description: "",
      image: "",
      msg: "",
      isAdmin: false
    };
  }

  componentDidMount() {
    fetch("https://csc309-team19-api.herokuapp.com" + "/api/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
        } else {
          this.setState({
            isAdmin: json.isAdmin
          });
        }
      });
  }

  handleAddItem() {
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("category", this.state.category);
    data.append("price", this.state.price);
    data.append("description", this.state.description);
    data.append("itemImage", this.state.image);
    axios
      .post("https://csc309-team19-api.herokuapp.com" + "/api/inventory", data)
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
      <>
        {!this.state.isAdmin ? (
          <h4>You do not have the rights to access this page</h4>
        ) : (
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
                <FormControl style={{ width: 300, marginTop: 15, height: 50 }}>
                  <InputLabel id="category-dropdown">Category</InputLabel>
                  <Select
                    labelId="category-dropdown"
                    onChange={e => {
                      this.setState({
                        category: e.target.value
                      });
                    }}
                    value={this.state.category}
                  >
                    <MenuItem value={"Watches"}>Watches</MenuItem>
                    <MenuItem value={"Shoes"}>Shoes</MenuItem>
                  </Select>
                </FormControl>

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
                  Choose An Image:
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
                <p>{this.state.msg}</p>
              </div>
            </div>
          </Container>
        )}
      </>
    );
  }
}
export default AddProduct;
