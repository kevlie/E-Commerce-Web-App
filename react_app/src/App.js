import React from "react";
import CategoriesData from "./components/CategoriesData/CategoriesData";
import NavBar from "./components/NavBar/NavBar.js";
import {Route, Switch} from "react-router-dom";
import ShoeProducts from "./components/Products/ShoeProducts";
import WatchProducts from "./components/Products/WatchProducts";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CheckoutComponent from "./components/CheckoutComponent/CheckoutComponent";
import Profile from "./components/AccountProfile/Profile";
import EditProfile from "./components/AccountProfile/EditProfile";
import AdminPage from "./components/AdminPage/AdminPage";
import Details from "./components/Details/Details";
import AddProduct from "./components/AdminPage/AddProduct";
import "./App.css";

function App() {
  return (
    <div>
      <div>
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={CategoriesData} />
            <Route path="/shoes" component={ShoeProducts} />
            <Route path="/watches" component={WatchProducts} />
            <Route path="/checkout" component={CheckoutComponent} />
            <Route path="/profile/:profileId" component={Profile} />
            <Route path="/editProfile/:profileId" component={EditProfile} />
            <Route path="/adminPage" component={AdminPage} />
            <Route path="/details" component={Details} />
            <Route path="/addProcuct" component={AddProduct} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
