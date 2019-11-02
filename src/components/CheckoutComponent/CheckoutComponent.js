import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Card, CardContent} from "@material-ui/core";

class CheckoutComponent extends Component {

    render() {
        console.log(this.props.cart)

        return (
            <div>
                {this.props.cart.map(item => {
                    return <Card>
                        <CardContent>
                            <span>{item.id}</span>
                        </CardContent>
                    </Card>
                })}
            </div>
        )
    }
}

export default CheckoutComponent;