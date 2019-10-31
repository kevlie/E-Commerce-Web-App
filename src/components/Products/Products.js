import React, { Component } from "react";
import Item from "../Item/Item";
import queryString from "query-string";
import Api from "../Api";

// This component is responsible for searching products.
// It performs the search based on parameters in the query string
// (because of this much state of this component actually lives in the URL).
// The URL is checked on first mount and when URL changes.
// We use query strings so that user could share a link to his/her search results for example.
class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalItemsCount: null,
      items: []
    };
  }

  async fetchData() {
    // Make simulated request to server to get items
    let qsAsObject = queryString.parse(this.props.location.search);
    let results = await Api.searchItems({
      ...qsAsObject,
      usePriceFilter: qsAsObject.usePriceFilter === "true"
    });

    this.setState({
      items: results.data,
      totalItemsCount: results.totalLength
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        {this.state.items.map(item => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

export default Products;
