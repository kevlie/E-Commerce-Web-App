import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Item from "../Item/Item";
import CircularProgress from "@material-ui/core/CircularProgress";
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
      loading: false,
      openPriceDialog: false,
      totalItemsCount: null,
      items: []
    };
  }

  updateQueryString(newValues) {
    let currentQs = queryString.parse(this.props.location.search);
    let newQS = { ...currentQs, ...newValues };
    this.props.history.push("/?" + this.convertObjectToQueryString(newQS));
  }

  async fetchData() {
    this.setState({ loading: true });

    // Make simulated request to server to get items
    let qsAsObject = queryString.parse(this.props.location.search);
    let results = await Api.searchItems({
      ...qsAsObject,
      usePriceFilter: qsAsObject.usePriceFilter === "true"
    });

    this.setState({
      items: results.data,
      loading: false,
      totalItemsCount: results.totalLength
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  pageTitle() {
    let pageTitle = "Search results";
    let category = queryString.parse(this.props.location.search).category;
    let directClick =
      queryString.parse(this.props.location.search).directClick === "true";

    if (category === undefined) {
      pageTitle = "All Products";
    } else if (directClick) {
      pageTitle = category;
    }
    return pageTitle;
  }

  render() {
    let pageTitle = this.pageTitle();

    if (this.state.loading) return <CircularProgress className="circular" />;

    return (
      <div>
        {/* Product list header */}
        <div style={{ padding: 10, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, fontSize: 24 }}>
            <div>{pageTitle}</div>
            {!this.state.loading && (
              <div style={{ fontSize: 12, color: "black", marginTop: 5 }}>
                Total results found: {this.state.totalItemsCount}
              </div>
            )}
          </div>
        </div>
        {/* Here go the items */}
        {this.state.items.map(item => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

export default Products;
