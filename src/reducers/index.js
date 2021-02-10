import { combineReducers } from 'redux'
import userReducer from "./userReducer"
import theme from "./themeReducer"

export default combineReducers({
  userReducer,
  theme
})