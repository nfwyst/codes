const http = require('http')
const url = require('url')
const fs = require('fs')
const mime = require('mime')

http
  .createServer(function (req, res) {
    const { pathname } = url.parse(req.url)
    let filepath = path.join(__dirname, pathname)
    fs.stat(filepath, (err, stat) => {
      if (err) {
        res.statusCode = 500
        return res.end(err.message)
      }
      const ifModifiedSince = req.headers['if-modified-since']
      if (ifModifiedSince === stat.ctime.toGMTString()) {
        // 资源没有被修改过
        res.writeHead(304)
        return res.end('')
      }
      // 资源被修改过则返回最新的资源
      res.setHeader('Content-Type', mime.getType(filepath))
      res.setHeader('Last-Modified', stat.ctime.toGMTString())
      fs.createReadStream(filepath).pipe(res)
    })
  })
  .listen(8080)
