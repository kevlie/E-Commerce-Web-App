import React from "react";

import Category from "../Category/Category";

import "./CategoriesData.css";

class CategoriesData extends React.Component {
  constructor() {
    super();

    this.state = {
      categories_data: [
        {
          categoryName: "SHOES",
          imageUrl: "https://i.ibb.co/wMdJ7x9/shoes.jpg",
          id: 1,
          linkUrl: "shop/shoes"
        },
        {
          categoryName: "WATCHES",
          imageUrl: "https://i.ibb.co/WtyMhSj/watches.jpg",
          id: 2,
          linkUrl: "shop/jackets"
        }
      ]
    };
  }

  render() {
    return (
      <div className="category_data">
        {this.state.categories_data.map(category => {
          return <Category key={category.id} category={category} />;
        })}
      </div>
    );
  }
}

export default CategoriesData;
