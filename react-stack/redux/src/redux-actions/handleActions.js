export default (actions, initialState) => {
  return (state = initialState, action) => {
    const reducer = actions[action.type]
    if (reducer) return reducer(state, action)
    return state
  }
}
