export default (type, createPayload) => {
  return (...args) => {
    return {
      type,
      payload: createPayload(...args)
    }
  }
}
