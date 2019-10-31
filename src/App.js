import React from "react";
import CategoriesData from "./components/CategoriesData/CategoriesData";
import NavBar from "./components/NavBar/NavBar.js";
import { Switch, Route } from "react-router-dom";
import Product from "./components/Products/Products";
// import { BrowserRouter, Switch, Route } from "react-router-dom";

const ShoesPage = () => (
  <div>
    <h1>SHOES PAGE </h1>
  </div>
);

// Use class only when we require state objects

function App() {
  return (
    <div>
      <div>
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/" component={CategoriesData} />
            <Route path="/shoes" component={Product} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
// class App extends React.Component {
//   render() {
//     return (
//       <div className="app">
//         {/* <NavBar /> */}
//         <div className="app-body">
//           <div className="content">
//             <BrowserRouter>
//               <Switch>
//                 <Route path="/" component={Product} />
//                 <Route
//                   component={() => (
//                     <div style={{ padding: 20 }}>Page not found</div>
//                   )}
//                 />
//               </Switch>
//             </BrowserRouter>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
export default App;
