import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "semantic-ui-css/semantic.min.css";
import { withRouter } from "react-router-dom";
import { Grid, Header, Icon, Message } from "semantic-ui-react";
import "./AccountOrder.css";

class AccountOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      firstName: "default",
      lastName: "default",
      email: "default",
      ordersList: []
    };
  }

  getUserOrder() {
    // console.log(this.state.userId);
    fetch("http://localhost:3001/api/orders/", {
      method: "GET",
      credentials: "include",
      headers: {
        userId: this.state.userId
      }
    })
      .then(response => response.json())
      .then(json => {
        // console.log(json.length);
        this.setState({ ordersList: json });
      });
  }
  componentDidMount() {
    // console.log(this.props.userId);
    // console.log(this.props.match.params.profileId);
    fetch("http://localhost:3001/api/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          //   this.props.history.push("/login");
        } else {
          this.setState({
            userId: json._id,
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email
          });
        }
      });
  }
  formatDate = date => {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  getOrderTotal = id => {
    const singleOrder = this.state.ordersList.find(order => order.id === id);
    let orderTotal = 0;
    singleOrder.items.forEach(item => {
      //   console.log(item.quantity);
      orderTotal = orderTotal + item.currentUnitPrice * item.quantity;
    });

    return orderTotal;
  };
  render() {
    this.getUserOrder();
    return (
      //   <>
      //     {!this.state.fail ? (
      <React.Fragment>
        <Header />
        <div className="Content">
          <div className="Card">
            <p className="CardText">My Orders</p>

            {this.state.ordersList.map(order => {
              return (
                <div className="Order">
                  <div className="OrderHeader">
                    <a href="#">{order.id}</a>
                  </div>
                  <div>
                    {order.items.map(item => (
                      <div
                        key={item.itemId}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "5px 0",
                          borderBottom: "1px solid #cecece"
                        }}
                      >
                        <div>
                          <p className="odtitle">{item.itemName}</p>
                          <div
                            style={{
                              fontSize: "14px",
                              color: "#555",
                              fontWeight: "bold"
                            }}
                          >
                            <p>Quantity: {item.quantity}</p>
                            <p>${item.currentUnitPrice * item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="OrderFooter">
                    <p>
                      Ordered On <span>{this.formatDate(order.orderDate)}</span>
                    </p>
                    <p>
                      Order Total <span>${this.getOrderTotal(order.id)}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
      // )
      // : (
      //   <h1>You have not purchased anything</h1>
      // )}
      //   </>
    );
  }
}

export default AccountOrders;
