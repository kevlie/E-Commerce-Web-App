import React from "react";
import {withRouter} from "react-router-dom";
import "./Category.css";

const Category = ({ category, match, history }) => (
  <div
    className="category"
    onClick={() => {
      history.push(`${match.url}${category.linkUrl}`);
    }}
  >
    <div
      className="image"
      style={{
        backgroundImage: `url(${category.imageUrl})`
      }}
    />
    <h1 className="categoryName">{category.categoryName}</h1>
  </div>
);

export default withRouter(Category);
