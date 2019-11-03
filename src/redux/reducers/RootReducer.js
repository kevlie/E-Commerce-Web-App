import {combineReducers} from 'redux'
import loggedReducer from './LoggedReducer'
import CartReducer from "./CartReducer";
import CartDrawerReducer from "./CartDrawerReducer";

const rootReducer = combineReducers({
    isLoggedIn: loggedReducer,
    cart: CartReducer,
    cartDrawerVisible: CartDrawerReducer
})
export default rootReducer