export const sign_in = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const ADD_ITEM = item => {
    return {
        type: "ADD_ITEM",
        item: item
    }
};

export const CLEAR_CART = () => {
    return {
        type: "CLEAR_CART"
    }
}

export const TOGGLE_CART_DRAWER = () => {
    return {
        type: 'TOGGLE_CART_DRAWER'
    }
};

export default {sign_in, ADD_ITEM, CLEAR_CART, TOGGLE_CART_DRAWER}
