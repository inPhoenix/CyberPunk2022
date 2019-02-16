import axios from 'axios'
// This is a duck
// https://github.com/erikras/ducks-modular-redux

// Actions
const LOAD   = 'LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

// Reducer
export default function reducer(state = {}, action = {}) {
  console.log('%c reducer', 'background: red')
  switch (action.type) {
    case LOAD:
      console.log('%c LOAD', 'background: red')
      return {
        loaded: 'hi'
      }
    default: return state;
  }
}

// Action Creators


export const signUp = () => ({ type: LOAD, payload: 'test' })

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget () {
//   return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }
