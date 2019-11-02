import React, {Component} from "react";
import CategoriesData from "./components/CategoriesData/CategoriesData";
import NavBar from "./components/NavBar/NavBar.js";
import { Switch, Route } from "react-router-dom";
import ShoeProducts from "./components/Products/ShoeProducts";
import WatchProducts from "./components/Products/WatchProducts";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CheckoutComponent from "./components/CheckoutComponent/CheckoutComponent";

class App extends Component{
  constructor() {
    super()
    this.state={
      cart :[]
    };
    this.addToCart = this.addToCart.bind(this)
  }

  addToCart(item) {
    this.setState({cart: [...this.state.cart, item]})
    console.log(item)
  }

  render(){
    return (
      <div>
        <div>
          <NavBar cartItems={this.state.cart}/>
          <div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/" component={CategoriesData} />
              <Route path="/shoes" render={routeProps => <ShoeProducts {...routeProps} addToCart ={this.addToCart}/>} />
              <Route path="/watches" component={WatchProducts} />
              <Route path="/checkout" render={routeProps => <CheckoutComponent {...routeProps} cart ={this.state.cart}/>}/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
