import { combineReducers } from 'redux'
import {userReducer} from '../components/user/redux/reducers'
import { postReducer } from "../components/post/redux/reducers"


import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  form,
})

export default rootReducer
