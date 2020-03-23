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

    const next = () => {
      if (index >= this.routes.length) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf8')
        return res.end('404 Not Found')
      }
      const { method, path, handler } = this.routes[index++]
      if (!method) { // 中间件
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
    return new App(opt)
  }
}

module.exports = (opt) => new Express(opt)
