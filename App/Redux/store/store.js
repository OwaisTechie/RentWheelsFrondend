import { configureStore } from '@reduxjs/toolkit'
import { combineReducers} from 'redux'
import authReducer from '../auth/Reducer/authReducer'
import AddressReducer from '../auth/Reducer/AddressReducer'
import vehicleReducer from '../auth/Reducer/vehicleReducer'
// const mainReducer = combineReducers({
//   auth: authReducer,
//   address:AddressReducer
// })
const store = configureStore({
  reducer:{
    auth: authReducer,
    address:AddressReducer,
    vehicles:vehicleReducer,
  }
})
export default store;