import React, { Component } from "react";
import MaterialTable from "material-table";

class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    fetch("http://localhost:3001/api/orders/", {
      method: "GET",
      credentials: "include",
      headers: {
        userId: this.props.userId
      }
    })
      .then(response => response.json())
      .then(json => {
        let allItems = [];
        for (let i = 0; i < json.length; i++) {
          for (let j = 0; j < json[i].items.length; j++) {
            const itemData = {
              orderId: json[i].id,
              itemId: json[i].items[j].itemId,
              name: json[i].items[j].itemName,
              quantity: json[i].items[j].quantity,
              price: json[i].items[j].currentUnitPrice
            };
            allItems.push(itemData);
          }
        }
        this.setState({
          items: allItems
        });
      });
  }

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "Order ID", field: "orderId" },
            { title: "Item ID", field: "itemId" },
            { title: "Name", field: "name" },
            { title: "Quantity", field: "quantity", type: "numeric" },
            { title: "Price", field: "price", type: "numeric" }
          ]}
          data={this.state.items}
          title="Items This User Bought"
        />
      </div>
    );
  }
}

export default OrderTable;
