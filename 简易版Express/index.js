const http = require('http')
const url = require('url')

class App {
  constructor(options = {}) {
    this.options = options
    this.server = null
    this.routes = []
    http.METHODS.forEach(method => {
      method = method.toLowerCase()
      this[method] = (path, handler) => {
        const layer = { method, path, handler }
        // 解析 params
        if (path.includes(':')) {
          const paramsNames = []
          path = path.replace(/:([^\/]+)/g, (pattern, match) => {
            paramsNames.push(match)
            return '([^\/]+)'
          })
          Object.assign(layer, { path: new RegExp(path), paramsNames })
        }
        this.routes.push(layer)
        return this
      }
    })
  }

  handler(req, res) {
    let index = 0
    const { pathname } = url.parse(req.url)

    const next = (err) => {
      if (index >= this.routes.length) {
        res.statusCode = err ? 500 : 404
        res.setHeader('Content-Type', 'text/html; charset=utf8')
        return err ? res.end(err.toString()) : res.end('404 Not Found')
      }
      const { method, path, handler, paramsNames } = this.routes[index++]
      if (err) {
        if (!method) { // 中间件
          if (pathname.startsWith(`${path}/`) || path === '/' || path === pathname) { // 路径匹配
            if (handler.length === 4) return handler(err, req, res, next)
          }
          next(err)
        } else { // 路由
          next(err)
        }
      } else if (!method) { // 中间件
        if (pathname.startsWith(`${path}/`) || path === '/' || path === pathname) {
          if (handler.length !== 4) return handler(req, res, next)
        }
        next()
      } else { // 路由
        if (paramsNames) { // 带路径参数
          req.params = {}
          let matchers = pathname.match(path)
          if (matchers) {
            paramsNames.forEach((item, index) => {
              req.params[item] = matchers[index + 1]
            })
            return handler(req, res)
          }
        } else {
          if (method === req.method.toLowerCase() && (path === pathname || path === '*')) return handler(req, res)
        }
        next()
      }
    }

    next()
  }

  listen(...args) {
    this.server = http.createServer(this.handler.bind(this))
    this.server.listen(...args)
    return this
  }

  all(path, handler) {
    http.METHODS.forEach(method => {
      method = method.toLowerCase()
      const layer = { method, path, handler }
      if (path.includes(':')) {
        const paramsNames = []
        path = path.replace(/:([^\/]+)/g, (pattern, match) => {
          paramsNames.push(match)
          return '([^\/]+)'
        })
        Object.assign(layer, { path: new RegExp(path), paramsNames })
      }
      this.routes.push(layer)
    })
    return this
  }

  use(path, handler) {
    if (typeof handler !== 'function') {
      handler = path
      path = '/'
    }
    this.routes.push({
      path,
      handler
    })
    return this
  }
}

class Express {
  constructor(opt) {
    const app = new App(opt)
    app.use(this.parseUrl)
    return app
  }

  /**
   * @param {object} req 请求
   * @param {object} res 响应
   * @param {function} next 下一个中间件
   */
  parseUrl(req, res, next) {
    const { query, pathname } = url.parse(req.url, true)
    const { host } = req.headers
    Object.assign(req, {
      query, path: pathname, hostname: host.split(':')[0]
    })
    next()
  }
}

module.exports = (opt) => new Express(opt)
