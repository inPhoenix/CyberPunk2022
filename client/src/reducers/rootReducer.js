import { combineReducers } from 'redux'
import * as userReducer from '../components/user/redux/reducers'


import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  user: userReducer,
  form,
})

export default rootReducer
