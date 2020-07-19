export default (actionCreator, reducer, initialState) => {
  return (state = initialState, action) => {
    if (action.type === actionCreator().type) {
      return reducer(state, action)
    }
    return state
  }
}
