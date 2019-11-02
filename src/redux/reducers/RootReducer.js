import { combineReducers } from 'redux'
import loggedReducer from './LoggedReducer'
const rootReducer = combineReducers({
    isLoggedIn: loggedReducer
})
export default rootReducer