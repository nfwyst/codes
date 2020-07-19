export default (config, reducer) => {
  let inited = false
  const { key, storage } = config
  const persistKey = `persist:${key}`
  return (state, action) => {
    switch (action.type) {
      case 'PERSIST_INIT':
        inited = true
        const value = storage.get(persistKey)
        state = value ? JSON.parse(value) : undefined
        return reducer(state, action)
      default:
        if (inited) {
          state = reducer(state, action)
          storage.set(persistKey, JSON.stringify(state))
          return state
        }
        return reducer(state, action)
    }
  }
}
