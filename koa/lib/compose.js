const { isArray } = Array

/**
 * 组合一系列中间件
 * @param {Array<(req, res) => {}>} 中间件数组
 * @return {(req, res) => {}} 中间件
 * @api public
 */
function compose(middleware) {
  if (!isArray(middleware)) throw TypeError('中间件栈必须是一个数组')

  for (const fn of middleware) {
    if (typeof fn !== 'function') {
      throw TypeError('中间件必须是一个函数')
    }
  }

  return (ctx, next) => {
    // 最后一次调用的中间件
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() 被多次调用'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
}

module.exports = compose
