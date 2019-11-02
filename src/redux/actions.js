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

export default {sign_in, ADD_ITEM}
