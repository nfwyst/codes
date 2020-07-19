export default function createSelector(selector, reduce) {
  let lastState
  let lastResult
  return (state) => {
    let newState = selector(state)
    if (lastState !== newState) {
      lastResult = reduce(newState)
      lastState = newState
    }
    return lastResult
  }
}
