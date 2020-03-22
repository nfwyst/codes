const http = require('http')
const url = require('url')
const fs = require('fs')
const mime = require('mime')
const crypto = require('crypto')

http
  .createServer(function (req, res) {
    const { pathname } = url.parse(req.url)
    const filepath = path.join(__dirname, pathname)
    fs.stat(filepath, err => {
      if (err) {
        res.statusCode = 500
        return res.end(err.message)
      }
      const ifNoneMatch = req.headers['if-none-match']
      const rs = fs.createReadStream(filepath)
      const md5Hash = crypto.createHash('md5')
      rs
        .on('data', data => {
          md5Hash.update(data)
        })
        .on('end', () => {
          const etag = md5Hash.digest('hex')
          if (etag === ifNoneMatch) {
            res.writeHead(304)
            return res.end('')
          }
          res.setHeader('ETag', etag)
          res.setHeader('Content-Type', mime.getType(filepath))
          fs.createReadStream(filepath).pipe(res)
        })
        .on('error', (err) => {
          res.statusCode = 500
          res.end(err.message)
        })
    })
  })
