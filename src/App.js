import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.js";
import Product from "./components/Products/Products";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        <div className="app-body">
          <div className="content">
            <BrowserRouter>
              <Switch>
                <Route path="/" component={Product} />
                <Route
                  component={() => (
                    <div style={{ padding: 20 }}>Page not found</div>
                  )}
                />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
