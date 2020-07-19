const isPromise = obj => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

export default ({ getState, dispatch }) => {
  return (next) => {
    return (action) => {
      return isPromise(action.paylod) ? action.payload.then(result => {
        dispatch({ ...action, payload: result })
      }).catch(err => {
        dispatch({ ...action, payload: err, error: true })
        return Promise.reject(err)
      }) : next(action)
    }
  }
}
