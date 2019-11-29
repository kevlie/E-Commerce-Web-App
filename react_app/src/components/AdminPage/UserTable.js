import React from "react";
import MaterialTable from "material-table";
import OrderTable from "./OrderTable";

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillMount() {
    fetch("http://localhost:3001/api/admin/users", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json !== null) {
          this.setState({ data: json });
        }
      });
  }
  render() {
    function parseUserData(data) {
      const ret = [];
      for (let i = 0; i < data.length; i++) {
        const userData = {
          id: data[i]._id,
          name: data[i].firstName,
          surname: data[i].lastName,
          email: data[i].email,
          itemsBought: 0,
          moneySpent: 0,
          isPremium: "No"
        };
        ret.push(userData);
      }
      return ret;
    }
    return (
      <MaterialTable
        title="All Users"
        columns={[
          { title: "ID", field: "id" },
          { title: "Name", field: "name" },
          { title: "Surname", field: "surname" },
          { title: "Email", field: "email" },
          { title: "Items Bought", field: "itemsBought", type: "numeric" },
          { title: "Money Spent", field: "moneySpent", type: "numeric" },
          { title: "Premium", field: "isPremium" }
        ]}
        data={parseUserData(this.state.data)}
        detailPanel={rowData => {
          return <OrderTable userId={rowData.id} />;
        }}
        editable={{
          onRowDelete: oldData =>
            fetch(`http://localhost:3001/api/admin/${oldData.id}`, {
              method: "DELETE",
              credentials: "include"
            })
              .then(response => response.json())
              .then(json => {
                if (json !== null) {
                  window.location.reload();
                }
                else{
                  console.log("Deletion Failed")
                }
              })
        }}
      />
    );
  }
}

export default UserTable;
