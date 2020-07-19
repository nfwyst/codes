export default (store) => {
  let persistor = {
    ...store,
    initialize() {
      store.dispatch({ type: 'PERSIST_INIT' })
    }
  }
  return persistor
}
