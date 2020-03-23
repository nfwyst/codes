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
    const findRoute = this.routes.find(route => {
      const { method, path } = route
      const { pathname } = url.parse(req.url)
      return method === req.method.toLowerCase() && (path === pathname || path === '*')
    })
    if (findRoute) return findRoute.handler(req, res)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf8')
    return res.end('404 Not Found')
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
}

class Express {
  constructor(opt) {
    return new App(opt)
  }
}

module.exports = (opt) => new Express(opt)
