const config = require('./config')
const http = require('http')
const chalk = require('chalk')
const debug = require('debug')('static:entry')
const url = require('url')
const path = require('path')
const { promisify, inspect } = require('util')
const fs = require('fs')
const mime = require('mime')

const stat = promisify(fs.stat)

class Server {
  constructor() {

  }

  start() {
    const server = http.createServer()
    server.on('request', this.onRequest.bind(this))
      .listen(config.port, () => {
        const url = `${config.host}:${config.port}`
        debug(`server started at port ${chalk.green(url)}`)
      })
  }

  async onRequest(req, res) {
    const { pathname } = url.parse(req.url)
    if (pathname === '/favicon.ico') return res.end()
    const filepath = path.resolve(config.root, `.${pathname}`)
    try {
      const stats = await stat(filepath)
      if (stats.isDirectory()) {

      } else {
        this.sendFile(req, res, filepath)
      }
    } catch (e) {
      debug(inspect(e, false, 3, true))
      debug(filepath, config)
      this.sendError(req, res)
    }
  }

  sendError(req, res) {
    res.statusCode = 500
    res.end(`something wrong...`)
  }

  sendFile(req, res, filepath) {
    res.statusCode = 200
    res.setHeader('Content-Type', mime.getType(filepath))
    fs.createReadStream(filepath).pipe(res)
  }
}

new Server().start()
