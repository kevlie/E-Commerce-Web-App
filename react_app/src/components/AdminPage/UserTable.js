import React from "react";

import "./UserTable.scss";
import Search from "@material-ui/icons/Search";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Check from "@material-ui/icons/Check";
import FilterList from "@material-ui/icons/FilterList";
import Remove from "@material-ui/icons/Remove";

import MaterialTable from "material-table";
import { Button } from "@material-ui/core";

const Row = ({ id, firstName, lastName, email, remove }) => (
  <div className="row">
    <div className="remove">
      <a onClick={() => remove(id)}>X</a>
    </div>
    <div>{id}</div>
    <div>{firstName}</div>
    <div>{lastName}</div>
    <div>{email}</div>
  </div>
);

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/users/adminPage", {
      method: "GET",
      credentials: "include"
    })
      .then(response => response.json())
      .then(json => {
        if (json === null) {
          this.props.history.push("/login");
        } else {
          console.log(json);
          this.setState({ data: json });
          // this.setState({
          //   firstName: json.firstName,
          //   lastName: json.lastName,
          //   email: json.email
          // });
        }
      });
  }
  remove = rowId => {
    // returns new array
    const arrayCopy = this.state.data.filter(row => row._id !== rowId);
    this.setState({ data: arrayCopy });
  };

  render() {
    const rows = this.state.data.map(rowData => (
      <Row remove={this.remove} {...rowData} />
    ));

    return (
      <div className="table">
        <div className="header">
          <div className="remove"></div>
          <div>ID</div>
          <div>First Name</div>
          <div>Last Name</div>
          <div>Email</div>
        </div>
        <div className="body">{rows}</div>
      </div>
    );
  }
}

export default UserTable;
// export default function UserTable() {
//   const data = [      {
//     name: "Mehmet",
//     surname: "Baran",
//     birthYear: 1987,
//     email: "methnemt@gmail.com"
//   },
//   {
//     name: "Zerya Betül",
//     surname: "Baran",
//     birthYear: 2017,
//     email: "123Serya@gmail.com"
//   }]
// const [state, setState] = React.useState({
//   columns: [
//     { title: "Name", field: "name" },
//     { title: "Surname", field: "surname" },
//     { title: "Birthday", field: "birthYear", type: "numeric" },
//     { title: "Email", field: "email" }
//   ],
//   data: [
// {
//   name: "Mehmet",
//   surname: "Baran",
//   birthYear: 1987,
//   email: "methnemt@gmail.com"
// },
// {
//   name: "Zerya Betül",
//   surname: "Baran",
//   birthYear: 2017,
//   email: "123Serya@gmail.com"
// }
//   ]
// });

//   return (

//   );
// }
