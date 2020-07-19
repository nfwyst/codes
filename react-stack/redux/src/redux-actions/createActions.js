export default (actions) => {
  const newActions = {}
  let types = Object.keys(actions)
  types.forEach(type => {
    newActions[type] = (...args) => {
      return { type, payload: actions[type](...args) }
    }
  })
  return newActions
}
