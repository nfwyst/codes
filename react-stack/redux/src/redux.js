const compose = (...funcs) => {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export default class Redux {
  static createStore = (...args) => {
    return new Store(...args)
  }

  static bindActionCreators = (actionCreators, dispatch) => {
    const bindActionCreator = (actionCreator, dispatch) => {
      return (...args) => dispatch(actionCreator(...args))
    }
    if (typeof actionCreators === 'function') {
      return bindActionCreator(actionCreators, dispatch)
    }
    const boundActionCreatetors = {}
    for (let key in actionCreators) {
      boundActionCreatetors[key] = bindActionCreator(actionCreators[key], dispatch)
    }
    return boundActionCreatetors
  }

  static combineReducers = (reducers) => {
    return (state = {}, action) => {
      let hasChanged = false
      const nextState = {}
      for (let scope in reducers) {
        const oldState = state[scope]
        const reducer = reducers[scope]
        const newState = reducer(oldState, action)
        nextState[scope] = newState
        hasChanged = hasChanged || oldState !== newState
      }
      return hasChanged ? nextState : state
    }
  }

  static applyMiddleware = (...middlewares) => {
    return (createStore) => {
      return (reducer) => {
        const store = createStore(reducer)
        let dispatch
        const middlewareAPI = {
          getState: store.getState,
          dispatch: (...args) => dispatch(...args)
        }
        const chain = middlewares.map(middleware => {
          return middleware(middlewareAPI)
        })
        dispatch = compose(...chain)(store.dispatch)
        return {
          ...store,
          dispatch
        }
      }
    }
  }
}

class Store {
  constructor (reducer, state) {
    this.state = state
    this.reducer = reducer
    this.sbs = []
    this.dispatch({ type: '@@REDUX_INIT' })
  }

  dispatch = (action) => {
    this.state = this.reducer(this.state, action)
    this.sbs.forEach(func => func())
  }

  getState = () => {
    return this.state
  }

  subscribe = (func) => {
    this.sbs.push(func)
    return () => {
      return this.sbs = this.sbs.filter(i => i !== func)
    }
  }
}
