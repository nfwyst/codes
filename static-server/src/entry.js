const config = require('./config')
const http = require('http')
const chalk = require('chalk')
const debug = require('debug')('static:entry')
const url = require('url')
const path = require('path')
const { promisify, inspect } = require('util')
const fs = require('fs')
const mime = require('mime')
const art = require('art-template')
const zlib = require('zlib')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

class Server {
  constructor(argv) {
    if (argv) {
      Object.assign(config, argv)
    }
  }

  start() {
    const server = http.createServer()
    server.on('request', this.onRequest.bind(this))
      .listen(config.port, config.host, () => {
        const url = `${config.host}:${config.port}`
        debug(`server started at port ${chalk.green(url)}`)
      })
  }

  compileTemplate(name, data) {
    const filepath = path.resolve(__dirname, `./template/${name}.art`)
    const html = art(filepath, data)
    return html
  }

  async onRequest(req, res) {
    const { pathname } = url.parse(req.url)
    if (pathname === '/favicon.ico') return res.end()
    const filepath = path.resolve(config.root, `.${pathname}`)
    try {
      const stats = await stat(filepath)
      if (stats.isDirectory()) {
        const files = await readdir(filepath)
        const html = this.compileTemplate('list', {
          title: pathname,
          files: files.map(file => ({
            url: path.join(pathname, file),
            name: file,
          }))
        })
        res.setHeader('Content-Type', 'text/html')
        res.end(html)
      } else {
        this.sendFile(req, res, filepath)
      }
    } catch (e) {
      debug(inspect(e, false, 3, true))
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
    const acceptEncoding = req.headers['accept-encoding']
    let transfer = null
    if (/\bgzip\b/.test(acceptEncoding)) {
      transfer = zlib.createGzip()
    } else if (/\bdeflate\b/.test(acceptEncoding)) {
      transfer = zlib.createDeflate()
    }
    if (transfer) return fs.createReadStream(filepath).pipe(transfer).pipe(res)
    fs.createReadStream(filepath).pipe(res)
  }
}


module.exports = Server
