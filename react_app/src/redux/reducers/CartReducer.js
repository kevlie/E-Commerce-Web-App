const CartReducer = (state = [], action) => {
    let newState;
    switch(action.type){
        case 'ADD_ITEM':
            if(state.find(item=>item.id === action.item.id
                && item.category === action.item.category) === undefined) {
                return [...state,Object.assign(action.item, {count:1})]
            } else {
                newState = Array.from(Object.create(state));

                newState.find(item=>item.id === action.item.id
                    && item.category === action.item.category).count += 1;
                return newState;
            }
        case 'CLEAR_CART':
            newState = [];
            return newState;
        default:
            return state
    }
}

export default CartReducer