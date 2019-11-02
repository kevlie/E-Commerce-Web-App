import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class CheckoutComponent extends Component {

    render() {
        console.log(this.props.cart)
        return (
            <p> check this out</p>
        )
    }
}

export default CheckoutComponent;