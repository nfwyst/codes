import { createStore } from 'redux'

const initialState = {
  todos: []
}

const reducer = (state = initialState, action) => {
  if (action.type === 'add') {
    return {
      ...state,
      todos: [...state.todos, action.payload]
    }
  }
  return state
}

export default createStore(reducer)
