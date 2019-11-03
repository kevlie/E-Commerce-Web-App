import React from "react";
import CategoriesData from "./components/CategoriesData/CategoriesData";
import NavBar from "./components/NavBar/NavBar.js";
import {Route, Switch} from "react-router-dom";
import ShoeProducts from "./components/Products/ShoeProducts";
import WatchProducts from "./components/Products/WatchProducts";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CheckoutComponent from "./components/CheckoutComponent/CheckoutComponent";
import Profile from "./components/Profile/Profile";
import ProfileEdict from "./components/ProfileEdict/ProfileEdict";

function App() {
  return (
    <div>
      <div>
        <NavBar/>
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/" component={CategoriesData} />
            <Route path="/shoes" component={ShoeProducts} />
            <Route path="/watches" component={WatchProducts} />
            <Route path="/checkout" component={CheckoutComponent}/>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile_edict" component={ProfileEdict} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
