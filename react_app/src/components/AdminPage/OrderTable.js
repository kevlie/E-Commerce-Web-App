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
          allItems = allItems.concat(json[i].items);
        }
        const parsedAllItems = [];
        for (let i = 0; i < allItems.length; i++) {
          const itemData = {
            id: allItems[i].itemId,
            name: allItems[i].itemName,
            quantity: allItems[i].quantity,
            price: allItems[i].currentUnitPrice
          };
          parsedAllItems.push(itemData);
        }
        this.setState({
          items: parsedAllItems
        });
      });
  }

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          columns={[
            { title: "User ID", field: "id" },
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
