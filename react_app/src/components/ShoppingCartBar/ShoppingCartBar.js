import React, {Component, Fragment} from "react";
import Badge from "@material-ui/core/Badge/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import './ShoppingCartBar.css'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Drawer, ListItemText, Typography} from "@material-ui/core";
import {TOGGLE_CART_DRAWER} from "../../redux/actions";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const mapStateToProps = state => {
    return{
        cart: state.cart,
        cartDrawerVisible: state.cartDrawerVisible
    };
};

class ShoppingCartBar extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }



    onClick() {
        this.props.history.push('/checkout')
        this.toggleDrawer()
    }

    toggleDrawer() {
        this.props.dispatch(TOGGLE_CART_DRAWER())
    }

    render() {
        console.log(this.props.cart)
        return (
            <div>
            <IconButton onClick={this.toggleDrawer}>
                {/* change badgecontent to number of items in cart */}
                <Badge badgeContent={
                    this.props.cart.reduce((a,b) => a + (b['count'] || 0), 0)
                } color="primary">
                    <ShoppingCartIcon/>
                </Badge>
            </IconButton>
                <Drawer anchor={'right'} open={this.props.cartDrawerVisible}
                        onClose={this.toggleDrawer}>
                    <div className='shoppingCartHeader'>
                        <Typography align={"center"} color={"textPrimary"} display={"block"} gutterBottom={true} variant='h4'>
                            <ShoppingCartIcon />
                            <span >
                                Cart
                            </span>
                        </Typography>
                    </div>
                    <div style={{overflow : 'auto'}}>
                    <List>{
                        this.props.cart.map(item => {
                                return(
                                    <Fragment key={item.category + item.id}>
                                        <ListItem key={item.category + item.id}>
                                            <span className='shoppingCartImages'>
                                                <img className="cartImg" src={item.image} alt={''}/>
                                            </span>
                                            <span className='shoppingCartItemNames'>
                                                <ListItemText primary={item.name}/>
                                            </span>
                                            <span className='shoppingCartCount'>
                                                <ListItemText primary={'Ct. ' + item.count}/>
                                            </span>
                                        </ListItem>
                                        <Divider/>
                                    </Fragment>
                                );
                            })
                        }
                    </List>
                    </div>
                    <div style={{display: this.props.cart.length <= 0? "none" : "flex"}} className='checkoutButton'>
                        <Button variant="outlined" color='primary' onClick={this.onClick}>
                            Checkout: ${ this.props.cart.reduce((a,b) => a + (b['price']*b['count'] || 0), 0)}
                        </Button>
                    </div>
                </Drawer>
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps)(ShoppingCartBar));
