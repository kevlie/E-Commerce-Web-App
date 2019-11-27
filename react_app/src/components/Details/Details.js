import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Container from "@material-ui/core/Container";

// import { connect } from "react-redux";
// import Item from "../Item/Item";

class Details extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            //get item and set state
        };
      }
    render() {
      return (
        <Container component="main">
           <div style={{ padding: 10 }}>
           <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            fontSize: 24
          }}
           >
        {/* Name and Image */}
          {"Air Max 97"}
          </div>
          <div style={{ display: "flex" }}>
          <img src={"https://images.unsplash.com/photo-1509991956814-dde211b7a2e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"} alt="" width={250} height={250} style={{ borderRadius: "5%", objectFit: "cover" }} />

           <div
            style={{
              flex: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "column"
            }} >
           {/* Price */}
           <div style={{ fontSize: 18, marginTop: 10, marginLeft: 15 }}>
              Price:  $
           </div>

           <Button
              style={{ width: 200, marginTop: 15 , height: 50}}
              color="primary"
              variant="outlined"
              onClick={() => {
                this.props.dispatch(
                    //call to add this item
                );
              }}
            >
              Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
            </Button>
          </div>
          </div>

        {/* Product Description */}
           <div
           style={{
            marginTop: 30,
            marginBottom: 20,
            fontSize: 24
           }}
        >
           Product Description
           </div>
           <div
           style={{
             marginLeft: 5,
             maxHeight: 200,
             fontSize: 13,
             overflow: "auto"
           }}
           >
           {"Product #: 5240376 Nike's Air Max line shook up the running world in 1997 when it debuted full-length Max Air cushioning."}
           </div>

        {/* Saler Informations */}
        <div
           style={{
            marginTop: 30,
            marginBottom: 20,
            fontSize: 24
           }}
        >
           Product Description
           </div>
           <div
           style={{
             marginLeft: 5,
             maxHeight: 200,
             fontSize: 13,
             overflow: "auto"
           }}
           >
           {"Foot Locker"}
           </div>

        {/* Relateditems */}
          <div
          style={{
            marginTop: 30,
            marginBottom: 10,
            fontSize: 24
          }}
          >
          Related Items
          </div>
          { "return another item"
          }
         </div> 
        </Container>
        
      );
    }
  }
export default Details;