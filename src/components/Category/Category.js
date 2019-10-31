import React from "react";
import "./Category.css";

const Category = ({ category }) => (
  <div className="category">
    <div
      className="image"
      style={{
        backgroundImage: `url(${category.imageUrl})`
      }}
    />
    <h1 className="categoryName">{category.categoryName}</h1>
  </div>
);

export default Category;
