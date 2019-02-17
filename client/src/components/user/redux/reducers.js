import cyberpunk from "../../../apis/cyberpunk"
import history from '../../../history'
// This is a duck
// https://github.com/erikras/ducks-modular-redux

// Actions
const SIGNUP = "cyberpunk-media/SIGNUP"
const ERROR = "cyberpunk-media/ERROR"

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
}

// Reducer
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        loaded: "hi"
      }
    case ERROR:
      return {
        ...state,
        loaded: "hi"
      }
    default:
      return state
  }
}

// Action Creators
export const signUp = (values = {}) => {
  return async dispatch => {
    let err, response
    ;[err, response] = await to(cyberpunk.post("/signup", values))
    if (err) {
      const safeError = {
        response: {
          data: {}
        },
        ...err,
      }
      errorLog(safeError.response.data)
      await dispatch(errorHandling())
    } else {
      await dispatch(updateUser(response.data))
      history.push('/')
    }
  }
}

export const updateUser = () => {
  return { type: SIGNUP, payload: "user-logged" }
}

export const errorHandling = () => {
  return { type: ERROR, payload: "error" }
}

const errorLog = error => {
  console.log("%c Error: ", "background: red; color: yellow", error)
}


//utility function to catch errors
const to = promise => {
  return promise
    .then(data => {
      return [null, data]
    })
    .catch(err => [err])
}
