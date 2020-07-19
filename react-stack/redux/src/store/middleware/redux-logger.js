export default ({ getState, dispatch }) => {
  return (next) => {
    return (action) => {
      console.log('previous state', JSON.stringify(getState()))
      next(action)
      console.log('new state', JSON.stringify(getState()))
    }
  }
}
