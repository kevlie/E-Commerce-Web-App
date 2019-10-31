import React from "react";
import CategoriesData from "./components/CategoriesData/CategoriesData";
import NavBar from "./components/NavBar/NavBar.js";
// import Product from "./components/Products/Products";
// import { BrowserRouter, Switch, Route } from "react-router-dom";

// Use class only when we require state objects

function App() {
  return (
    <div>
      <div>
        <NavBar />
        <div>
          <CategoriesData />
        </div>
      </div>
    </div>
  );
}

export default App;
