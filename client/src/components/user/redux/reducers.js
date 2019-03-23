import cyberpunk from "../../../apis/cyberpunk"
import history from "../../../history"
// This is a duck
// https://github.com/erikras/ducks-modular-redux

// Actions
const SIGNUP = "cyberpunk-media/SIGNUP"
const UPDATE = "cyberpunk-media/UPDATE"
const ERROR = "cyberpunk-media/ERROR"
const ISLOADING = "cyberpunk-media/ISLOADING"
const AUTH = "cyberpunk-media/AUTH"
const LOADED_USER = "cyberpunk-media/LOADED_USER"
const LOADED_USERS = "cyberpunk-media/LOADED_USERS"
const DELETE_USER = "cyberpunk-media/DELETE_USER"

const INITIAL_STATE = {
  isSignedIn: null,
  loaded: {},
  deletedUser: false,
  loadedUsers: {
    users: {}
  },
  loadedUser: {},
  isError: false
}

// Reducer
export const userReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        deletedUser: false,
        isAuth: action.payload
      }
    case LOADED_USER:
      return {
        ...state,
        deletedUser: false,
        loadedUser: action.payload
      }
    case DELETE_USER:
      return {
        ...state,
        deletedUser: true
      }

    case LOADED_USERS:
      return {
        ...state,
        deletedUser: false,
        loadedUsers: action.payload
      }
    case SIGNUP:
      return {
        ...state,
        isError: false,
        deletedUser: false,
        loaded: action.payload
      }

    case UPDATE:
      return {
        ...state,
        isError: false,
        deletedUser: false,
        loadedUser: action.payload.user
      }
    case ERROR:
      return {
        ...state,
        isError: true
      }
    case ISLOADING:
      return {
        ...state,
        isLoading: action.status
      }
    default:
      return state
  }
}

// Action Creators
export const signUp = (values = {}) => {
  return async dispatch => {
    let [err, response] = await to(cyberpunk.post("/signup", values))
    if (err) {
      console.error("%c err", "background: red", err)
      const safeError = {
        response: {
          data: {},
          ...err
        }
      }
      errorLog(safeError.response.data)
      await dispatch(errorHandling())
    } else {
      await dispatch(updateUser(response.data))
      history.push("/")
    }
  }
}

export const editUserProfile = (values = {}, userId) => {
  const END_POINT = `/user/${userId}`

  const config = {
    headers: { "content-type": "multipart/form-data" }
  }
  return async dispatch => {
    let [err, response] = await to(cyberpunk.put(END_POINT, values, config))
    if (err) {
      console.error("%c err", "background: red", err)
      const safeError = {
        response: {
          data: {},
          ...err
        }
      }
      errorLog(safeError.response.data)
      await dispatch(errorHandling())
    } else {
      await dispatch(updateEditUser(response.data))
      history.push(`/user/${userId}`)
    }
  }
}

export const signOut = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    let [err, response] = await to(cyberpunk.get("/signout"))

    if (err) {
      const safeError = {
        data: {},
        ...err
      }
      errorLog(safeError.response.data)
      dispatch(setLoading(false))
      await dispatch(errorHandling())
    } else {
      const safeResponse = {
        data: {}
      }
      await dispatch(updateUser(safeResponse))
      if (window != null) {
        localStorage.removeItem("jwt")
      }
      dispatch(setLoading(false))
      history.push("/")
    }
  }
}

export const signIn = (values = {}) => {
  return async dispatch => {
    dispatch(setLoading(true))
    let [err, response] = await to(cyberpunk.post("/signin", values))

    if (err) {
      console.error("%c err", "background: red", err)
      const safeError = {
        response: {
          data: "error",
          ...err
        }
      }
      errorLog(safeError.response.data)
      dispatch(setLoading(false))
      await dispatch(errorHandling())
    } else {
      const safeResponse = {
        data: {},
        ...response
      }
      await dispatch(updateUser(safeResponse.data))
      if (window != null) {
        localStorage.setItem("jwt", JSON.stringify(safeResponse.data))
      }
      dispatch(setLoading(false))
      history.push("/homepage")
    }
  }
}

const setLoading = state => {
  return { type: ISLOADING, status: state }
}

export const updateUser = data => {
  return { type: SIGNUP, payload: data }
}
export const updateEditUser = data => {
  return { type: UPDATE, payload: data }
}

export const errorHandling = () => {
  return { type: ERROR, payload: "error" }
}

const errorLog = error => {
  console.error("%c Error: ", "background: red; color: yellow", error)
}

//utility function to catch errors
const to = promise => {
  return promise
    .then(data => {
      return [null, data]
    })
    .catch(err => [err])
}

export const checkIsAuthenticated = (values = {}) => {
  return async dispatch => {
    const getToken = JSON.parse(localStorage.getItem("jwt"))
    dispatch(isAuthenticated(getToken)) // always dispatch a function
  }
}

export const loadedUser = user => {
  return { type: LOADED_USER, payload: user }
}

export const loadedUsers = users => {
  return { type: LOADED_USERS, payload: users }
}

export const getUserInformation = userId => {
  const getToken1 = JSON.parse(localStorage.getItem("jwt"))
  const getToken = (getToken1 && getToken1.token) || "noToken"

  cyberpunk.defaults.headers.common = { Authorization: `bearer ${getToken}` }

  return async dispatch => {
    const response = await cyberpunk.get(`/user/${userId}`)
    dispatch(loadedUser(response.data))
  }
}

export const getUsers = userId => {
  const getToken1 = JSON.parse(localStorage.getItem("jwt"))
  const getToken = (getToken1 && getToken1.token) || "noToken"

  cyberpunk.defaults.headers.common = { Authorization: `bearer ${getToken}` }

  return async dispatch => {
    const response = await cyberpunk.get(`/users/`)
    dispatch(loadedUsers(response.data))
  }
}

export const deleteUser = userId => {
  const getToken1 = JSON.parse(localStorage.getItem("jwt"))
  const getToken = (getToken1 && getToken1.token) || "noToken"

  cyberpunk.defaults.headers.common = { Authorization: `bearer ${getToken}` }

  return async dispatch => {
    const response = await cyberpunk.delete(`/user/${userId}`)
    dispatch(deleteUserEvent(response.data))
  }
}

export const deleteUserEvent = user => {
  return { type: DELETE_USER, payload: user }
}

export const isAuthenticated = token => {
  return { type: AUTH, payload: token }
}

// Helper without redux
export const isAuthenticatedPure = () => {
  return { type: AUTH, payload: JSON.parse(localStorage.getItem("jwt")) }
  if (window == null) {
    return false
  }
  if (localStorage.getItem("jwt")) {
    return { type: AUTH, payload: JSON.parse(localStorage.getItem("jwt")) }
  } else {
    return false
  }
}
