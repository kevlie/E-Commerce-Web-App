import React from "react";
import MaterialTable from "material-table";
import OrderTable from "./OrderTable";
import { withRouter } from "react-router-dom";

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isAdmin: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/profile", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          this.props.history.push("/login");
        } else {
          this.setState({
            isAdmin: json.isAdmin
          });
        }
      });
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
          isPremium:
            data[i].isPremium.toString() === "true" ? (
              <font color="blue">Yes</font>
            ) : (
              <font color="red">No</font>
            )
        };
        ret.push(userData);
      }
      return ret;
    }
    return (
      <>
        {!this.state.isAdmin ? (
          <h4> You do not have the rights to access this page</h4>
        ) : (
          <MaterialTable
            title="All Users"
            columns={[
              { title: "User ID", field: "id" },
              { title: "Name", field: "name" },
              { title: "Surname", field: "surname" },
              { title: "Email", field: "email" },
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
                    } else {
                      console.log("Deletion Failed");
                    }
                  })
            }}
          />
        )}
      </>
    );
  }
}

export default withRouter(UserTable);
