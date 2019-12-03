import React, { Component, Fragment } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import "./CheckoutComponent.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {
  ADD_ITEM,
  CLEAR_CART,
  DELETE_ITEM,
  REMOVE_ITEM
} from "../../redux/actions";

const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

class CheckoutComponent extends Component {
  constructor() {
    super();
    this.totalCost = this.totalCost.bind(this);
    this.thankYouRedirect = this.thankYouRedirect.bind(this);
    this.cartDisplayState = this.cartDisplayState.bind(this);
  }

  totalCost() {
    return this.props.cart.reduce(
      (a, b) => a + (b["price"] * b["count"] || 0),
      0
    );
  }

  thankYouRedirect() {
    this.props.dispatch(CLEAR_CART());
    alert("Thanks for shopping with us!");
    this.props.history.push("/");
  }

  cartDisplayState() {
    return this.props.cart.length <= 0 ? "none" : "flex";
  }

  handleCheckOut() {
    let array = [];
    this.props.cart.map(item => {
      // console.log(item.id);
      array.push({
        itemId: item.id,
        quantity: item.count,
        currentUnitPrice: item.price,
        itemName: item.name
      });
    });
    fetch("http://localhost:3001/api/orders", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        items: array
      })
    }).then(res => {
      if (res.status === 201) {
        this.thankYouRedirect();
      }
    });
  }

  render() {
    console.log(this.props.cart);

    const checkoutButtons = {
      "font-family":
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      "font-size": "small",
      "padding-left": "0",
      "padding-right": "2",
      "justify-content": "left",
      "min-width": "0",
      "text-transform": "capitalize"
    };

    return (
      <div>
        {this.props.cart.map(item => {
          return (
            <Fragment>
              <Card>
                <img className="checkoutImages" src={item.image} alt="eet" />

                <CardContent component="span">
                  <Typography variant="h5">{item.name}</Typography>
                  <span>Quantity: {item.count}</span>
                  <span className="checkoutPricing">
                    ${item.count * item.price}
                  </span>
                  <div>
                    <Button
                      style={checkoutButtons}
                      onClick={() => this.props.dispatch(ADD_ITEM(item))}
                    >
                      +1
                    </Button>
                    <Button
                      style={checkoutButtons}
                      onClick={() => this.props.dispatch(REMOVE_ITEM(item))}
                    >
                      -1
                    </Button>
                    <Button
                      style={checkoutButtons}
                      onClick={() => this.props.dispatch(DELETE_ITEM(item))}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Divider />
            </Fragment>
          );
        })}

        <div
          style={{ display: this.cartDisplayState() }}
          className="checkoutPricing"
        >
          <Typography variant={"subtitle1"}>
            Total: ${this.totalCost()}
          </Typography>
        </div>
        <div
          style={{ display: this.cartDisplayState(), clear: "right" }}
          className="checkoutButton"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.handleCheckOut();
            }}
          >
            Buy It
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CheckoutComponent);
