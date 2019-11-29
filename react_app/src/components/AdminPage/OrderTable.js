// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";

// const columns = [
//   { id: "id", label: "ID", minWidth: 170, format: value => value.toLocaleString()},
//   { id: "name", label: "Name", minWidth: 170},
//   {
//     id: "quantity",
//     label: "Quantity",
//     align: "right",
//     minWidth: 100,
//     format: value => value.toLocaleString()
//   },
//   {
//     id: "price",
//     label: "Price",
//     minWidth: 100,
//     align: "right",
//     format: value => value.toLocaleString()
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// class OrderTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       page: 0,
//       rowsPerPage: 5,
//       userData: []
//     };
//   }

//   handleChangePage = (event, newPage) => {
//     this.setState({
//       page: newPage
//     })
//   };

//   handleChangeRowsPerPage = event => {
//     this.setState({
//       page: 0,
//       rowsPerPage: +event.target.value
//     })
//   };

//   component(){
//     fetch("http://localhost:3001/api/orders/", {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         // userId: this.props.userId use this when fixed
//         userId: "c9f3527c-0c02-4f1a-8e6f-6bed2c133c6e" // temporary hard code
//       }
//     })
//       .then(response => {
//         let allItems = []
//         for (let i = 0; i < response.length; i++){
//           allItems.concat(response[i].items)
//         }
//       });
//   }

//   render() {
//     return (
//       <Paper
//         className={{
//           width: "100%"
//         }}
//       >
//         <div
//           className={{
//             maxHeight: 440,
//             overflow: "auto"
//           }}
//         >
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map(column => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {this.fetchAllItems()
//                 .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
//                 .map(row => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={row.id}
//                     >
//                       {columns.map(column => {
//                         const value = row[column.id];
//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             {column.format && typeof value === "number"
//                               ? column.format(value)
//                               : value}
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </div>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15]}
//           component="div"
//           count={this.state.data.length}
//           rowsPerPage={this.state.rowsPerPage}
//           page={this.state.page}
//           onChangePage={this.handleChangePage}
//           onChangeRowsPerPage={this.handleChangeRowsPerPage}
//         />
//       </Paper>
//     );
//   }
// }
// export default OrderTable;

import React, {Component} from "react";
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
        // userId: this.props.userId use this when fixed
        userId: "c9f3527c-0c02-4f1a-8e6f-6bed2c133c6e" // temporary hard code
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
            name: "Utama",
            quantity: allItems[i].quantity,
            price: 69
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
            { title: "ID", field: "id" },
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
