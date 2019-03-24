import cyberpunk from "../../../apis/cyberpunk"
import history from "../../../history"
//import { errorHandling, loadedUser } from "../../user/redux/reducers"
// This is a duck
// https://github.com/erikras/ducks-modular-redux

// Actions
const CREATE_POST = "cyberpunk-media/CREATE_POST"
const LOAD_POSTS = "cyberpunk-media/LOAD_POSTS"
const IS_LOADING = "cyberpunk-media/IS_LOADING"
const FETCH_POSTS = "cyberpunk-media/FETCH_POSTS"

const errorLog = error => {
  console.error("%c Error: ", "background: red; color: yellow", error)
}

const INITIAL_STATE = {
  posts: {}
}

// Reducer
export const postReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        isError: false
        //posts: action.payload
      }
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.status
      }
    case FETCH_POSTS:
      return {
        ...state,
        ...action.posts,
        isLoading: false
      }
    default:
      return state
  }
}

export const createPost = (values = {}, userId) => {
  const getToken1 = JSON.parse(localStorage.getItem("jwt"))
  const getToken = (getToken1 && getToken1.token) || "noToken"
  return async dispatch => {
    cyberpunk.defaults.headers.common = { Authorization: `bearer ${getToken}` }

    let [err, response] = await to(
      cyberpunk.post(`/post/new/${userId}`, values)
    )

    if (err) {
      console.error("%c err", "background: red", err)
      const safeError = {
        response: {
          data: {},
          ...err
        }
      }
      errorLog(safeError.response.data)
    } else {
      await dispatch(updatePosts(response.data))
      await dispatch(fetchPosts(response.data))
      //history.push("/")
    }
  }
}

export const fetchPosts = () => {
  console.log("%c fetching", "background: purple")
  return async dispatch => {
    const response = await cyberpunk.get(`/posts/`)
    dispatch(loadPosts(response.data))
  }
}

const setLoading = state => {
  return { type: IS_LOADING, status: state }
}

export const updatePosts = data => {
  console.log("%c data", "background: red", data)
  return { type: CREATE_POST, payload: data }
}

export const loadPosts = data => {
  return { type: FETCH_POSTS, posts: data }
}

// utility function to catch errors
const to = promise => {
  return promise
    .then(data => {
      return [null, data]
    })
    .catch(err => [err])
}
