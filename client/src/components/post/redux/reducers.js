import cyberpunk from "../../../apis/cyberpunk"
import history from "../../../history"

// This is a duck
// https://github.com/erikras/ducks-modular-redux

// Actions
const CREATE_POST = "cyberpunk-media/CREATE_POST"
const IS_LOADING = "cyberpunk-media/IS_LOADING"
const FETCH_POSTS = "cyberpunk-media/FETCH_POSTS"
const FETCH_POST = "cyberpunk-media/FETCH_POST"
const POSTS_BY_USER = "cyberpunk-media/POSTS_BY_USER"
const DELETE_POST = "cyberpunk-media/DELETE_POST"

const errorLog = error => {
  console.error("%c Error: ", "background: red; color: yellow", error)
}

const INITIAL_STATE = {
  posts: {},
  single: {},
  isLoading: false,
  userPosts: {}
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
    case FETCH_POST:
      return {
        ...state,
        single: {
          ...action.post
        },
        isLoading: false
      }
    case DELETE_POST:
      return {
        ...state,
        ...action.posts,
        isLoading: false
      }
    case POSTS_BY_USER:
      return {
        ...state,
        userPosts: [...action.posts],
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
    dispatch(setLoading(true))
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
      dispatch(setLoading(false))
    } else {
      await dispatch(updatePosts(response.data))
      await dispatch(fetchPosts(response.data))
      dispatch(setLoading(false))
      //await dispatch(reset('NewPost'))
      //history.push("/")
    }
  }
}

export const updatePost = (values = {}, postId) => {
  const getToken1 = JSON.parse(localStorage.getItem("jwt"))
  const getToken = (getToken1 && getToken1.token) || "noToken"
  return async dispatch => {
    dispatch(setLoading(true))
    cyberpunk.defaults.headers.common = { Authorization: `bearer ${getToken}` }

    let [err, response] = await to(cyberpunk.put(`/post/${postId}`, values))

    if (err) {
      console.error("%c err", "background: red", err)
      const safeError = {
        response: {
          data: {},
          ...err
        }
      }
      errorLog(safeError.response.data)
      dispatch(setLoading(false))
    } else {
      await dispatch(updatePosts(response.data))
      await dispatch(fetchPosts(response.data))
      dispatch(setLoading(false))
      //await dispatch(reset('NewPost'))
      history.push("/homepage")
    }
  }
}

export const fetchSinglePost = postId => {
  return async dispatch => {
    dispatch(setLoading(true))
    const response = await cyberpunk.get(`/post/${postId}`)
    dispatch(loadSinglePost(response.data))
    dispatch(setLoading(false))
  }
}

export const fetchSinglePostAfterComment = postId => {
  return async dispatch => {
    const response = await cyberpunk.get(`/post/${postId}`)
    dispatch(loadSinglePost(response.data))
  }
}

export const listPostsByUser = userId => {
  return async dispatch => {
    dispatch(setLoading(true))
    const response = await cyberpunk.get(`/posts/by/${userId}`)
    dispatch(loadUserPost(response.data))
    dispatch(setLoading(false))
  }
}

export const fetchPosts = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    const response = await cyberpunk.get(`/posts/`)
    dispatch(loadPosts(response.data))
    dispatch(setLoading(false))
  }
}

export const commentPost = (userId, postId, comment) => {
  const getToken1 = JSON.parse(localStorage.getItem("jwt"))
  const getToken = (getToken1 && getToken1.token) || "noToken"
  return async dispatch => {
    cyberpunk.defaults.headers.common = { Authorization: `bearer ${getToken}` }

    const values = {
      userId,
      postId,
      comment
    }

    let [err] = await to(cyberpunk.put(`/post/comment`, values))

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
      await dispatch(fetchSinglePostAfterComment(postId))
    }
  }
}

export const uncommentPost = (userId, postId, comment) => {
  const getToken1 = JSON.parse(localStorage.getItem("jwt"))
  const getToken = (getToken1 && getToken1.token) || "noToken"
  return async dispatch => {
    cyberpunk.defaults.headers.common = { Authorization: `bearer ${getToken}` }

    const values = {
      userId,
      postId,
      comment
    }

    let [err, response] = await to(cyberpunk.put(`/post/uncomment`, values))

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
      await dispatch(fetchSinglePostAfterComment(postId))
    }
  }
}

export const deletePost = postId => {
  const getToken1 = JSON.parse(localStorage.getItem("jwt"))
  const getToken = (getToken1 && getToken1.token) || "noToken"

  cyberpunk.defaults.headers.common = { Authorization: `bearer ${getToken}` }

  return async dispatch => {
    const response = await cyberpunk.delete(`/post/${postId}`)
    dispatch(deletePostEvent(response.data))
    dispatch(fetchPosts())
  }
}

const setLoading = state => {
  return { type: IS_LOADING, status: state }
}

export const updatePosts = data => {
  return { type: CREATE_POST, payload: data }
}

export const deletePostEvent = data => {
  return { type: DELETE_POST, payload: data }
}

export const loadUserPost = data => {
  return { type: POSTS_BY_USER, posts: data }
}

export const loadPosts = data => {
  return { type: FETCH_POSTS, posts: data }
}

export const loadSinglePost = data => {
  return { type: FETCH_POST, post: data }
}

// utility function to catch errors
const to = promise => {
  return promise
    .then(data => {
      return [null, data]
    })
    .catch(err => [err])
}
