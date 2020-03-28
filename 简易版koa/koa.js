const http = require('http')
const url = require('url')

class Koa {
  constructor() {
    this.middleware = []
  }

  use(fn) {
    this.middleware.push(fn)
  }

  compose(middleware, ctx) {
    return function fnMiddleware() {
      return dispatchWrap(0)
      function dispatchWrap(i) {
        let fn = middleware[i]
        if (!fn) return Promise.resolve()
        return fn(ctx, function next() {
          return dispatchWrap(i + 1)
        })
      }
    }
  }

  hanldeResponse(ctx) {
    const { body, res } = ctx
    if (typeof body === 'string') {
      res.end(body)
    } else if (body.constructor.name === 'ReadStream') {
      body.pipe(res)
    }
  }

  listen(port, fn) {
    let server = http.createServer((req, res) => {
      const ctx = { req, res, path: url.parse(req.url).pathname, method: req.method }
      let fnMiddleware = this.compose(this.middleware, ctx)
      fnMiddleware().then(() => {
        this.hanldeResponse(ctx)
      }).catch((e) => {
        console.log(e)
      })
    })
    server.listen(port, fn)
  }
}

module.exports = Koa
