const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

http
  .createServer(function (req, res) {
    const { pathname } = url.parse(req.url)
    if (pathname === '/favicon.ico') return res.end()
    const filepath = path.resolve(__dirname, `.${pathname}`)
    fs.stat(filepath, err => {
      if (err) {
        res.statusCode = 500
        return res.end(err.message)
      }
      res.setHeader('Content-Type', mime.getType(filepath))
      res.setHeader('Cache-Control', 'max-age=30')
      fs.createReadStream(filepath).pipe(res)
    })
  })
  .listen(8080, () => console.log('server started on port 8080'))
