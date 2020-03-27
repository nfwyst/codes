const http = require('http')
const Emitter = require('events')
const debug = require('debug')('koa:application')
const compose = require('./compose')

class Application extends Emitter {
  constructor() {
    super()
    this.middleware = []
  }

  /**
   * 使用给定的中间件
   * @param {(req, res) => {}} fn
   */
  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('中间件必须是一个函数')
    debug('use %s', fn._name || fn.name || '-')
    this.middleware.push(fn)
    return this
  }

  /**
   * 错误处理
   */
  onError(err) {
    console.error(err)
  }

  /**
   * 生成上下文
   */
  createContext(req, res) {
    return {
      req,
      res,
      set body(val) {
        if (typeof val === 'object') {
          res.end(JSON.stringify(val))
        } else if (typeof val === 'number') {
          res.statusCode = val
          res.end(http.STATUS_CODES[val])
        }
        res.end(val)
      }
    }
  }

  /**
   * 处理请求
   */
  handleRequest(ctx, fn) {
    fn(ctx, (ctx, next) => { next() })
  }

  /**
   * 给 http 服务器返回一个请求处理器
   * @return {(req, res) => {}}
   * @api public
   */
  callback() {
    const fn = compose(this.middleware)
    if (!this.listeners('error').length) this.on('error', this.onError)
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }

    return handleRequest
  }

  /**
   * http.createServer(app.callback()).listen(...) 的简写
   * @param {Mixed} ...
   * @return {http.Server}
   * @api public
   */
  listen(...args) {
    debug('listen', ...args)
    http.createServer(this.callback()).listen(...args)
  }
}

module.exports = Application
