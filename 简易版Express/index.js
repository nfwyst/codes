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
        this.routes.push({ method, path, handler })
        return this
      }
    })
  }

  handler(req, res) {
    let index = 0
    const { pathname } = url.parse(req.url)

    const next = (err) => {
      if (index >= this.routes.length) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf8')
        return res.end('404 Not Found')
      }
      const { method, path, handler } = this.routes[index++]
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
          return handler(req, res, next)
        }
        next()
      } else { // 路由
        if (method === req.method.toLowerCase() && (path === pathname || path === '*')) return handler(req, res)
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
      this.routes.push({ method, path, handler })
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
    const { hostname } = req.headers
    Object.assign(req, {
      query, path: pathname, hostname
    })
    next()
  }
}

module.exports = (opt) => new Express(opt)
