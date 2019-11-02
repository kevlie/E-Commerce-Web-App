import React, {Component} from "react";
import Badge from "@material-ui/core/Badge/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import './ShoppingCartBar.css'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return{
        cart: state.cart
    };
};

class ShoppingCartBar extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.history.push('/checkout')
    }

    render() {
        console.log(this.props.cart)
        return (
            <IconButton onClick={this.onClick}>
                {/* change badgecontent to number of items in cart */}
                <Badge badgeContent={this.props.cart.length} color="primary">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
        );
    }
}
export default withRouter(connect(mapStateToProps)(ShoppingCartBar));
