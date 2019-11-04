const CartDrawerReducer = (state = false, action) => {
    switch(action.type) {
        case "TOGGLE_CART_DRAWER":
            return !state;
        default:
            return state;
    }
};

export default CartDrawerReducer;