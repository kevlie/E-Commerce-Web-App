const CartReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_ITEM':
            return state.push(action.item)
        default:
            return state
    }
}

export default CartReducer