const CartReducer = (state = [], action) => {
    let newState;
    let index;

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
        case 'REMOVE_ITEM':
            index = state.findIndex(item=>item.id === action.item.id
                && item.category === action.item.category);
            if (index !== -1) {
                if (state[index].count === 1){
                   state.splice(index,1);
                } else {
                    state[index].count -= 1;
                }
                newState = Array.from(Object.create(state));
                return newState;
            }
            return state;
        case 'DELETE_ITEM':
            index = state.findIndex(item=>item.id === action.item.id
                && item.category === action.item.category);
            if (index !== -1) {
                state.splice(index,1);
                newState = Array.from(Object.create(state));
                return newState;
            }
            return state;
        default:
            return state
    }
}

export default CartReducer