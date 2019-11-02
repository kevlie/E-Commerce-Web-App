import { combineReducers } from 'redux'
import loggedReducer from './LoggedReducer'
import CartReducer from "./CartReducer";
const rootReducer = combineReducers({
    isLoggedIn: loggedReducer,
    cart: CartReducer
})
export default rootReducer