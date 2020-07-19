export default ({ getState, dispatch }) => {
  return (next) => {
    return (action) => {
      if (typeof action === 'function') {
        return action(dispatch)
      } else {
        return next(action)
      }
    }
  }
}
