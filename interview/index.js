const http = require('http')
const querystring = require('querystring')
const url = require('url')
const path = require('path')
const fs = require('fs')

const server = http.createServer()
const root = path.resolve(__dirname)
const uploadPath = path.resolve(__dirname, './upload')

Buffer.prototype.split = function (sep) {
  let pos = 0
  let len = sep.length
  let index = -1
  let parts = []
  while (-1 !== (index = this.indexOf(sep, pos))) {
    parts.push(this.slice(pos, index))
    pos = len + index
  }
  if (pos < this.length - 1) parts.push(this.slice(pos))
  return parts
}

server.on('request', (req, res) => {
  const { pathname } = url.parse(req.url)
  if (pathname === '/favicon.ico') return res.end()
  const filepath = path.resolve(root, `.${pathname}`)
  try {
    const stats = fs.statSync(filepath)
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html; charset=utf8')
      return fs.createReadStream(filepath).pipe(res)
    }
  } catch (e) {
    res.statusCode = 500
    res.end('something wrong...')
  }
  let result = []
  req
    .on('data', data => result.push(data))
    .on('end', () => {
      const contentType = req.headers['content-type']
      let sep
      if (!contentType.startsWith('multipart/form-data')) {
        res.statusCode = 500
        res.end('bad request...')
      } else {
        const matches = contentType.match(/\bboundary=(.+)/)
        sep = `--${matches[1]}`
      }
      let all = Buffer.concat(result)
      const fields = {}
      const lines = all.split(sep).slice(1, -1)
      lines.forEach(line => {
        let [desc, val] = line.split('\r\n\r\n')
        desc = desc.toString('utf8').replace(/\"/g, '')
        val = val.slice(0, -2)
        if (desc.includes('filename')) {
          const [, line1, line2] = desc.split('\r\n')
          const line1Obj = querystring.parse(line1, '; ')
          const line2Obj = querystring.parse(line2, '; ')
          const filepath = path.join(rootDir, uuid.v4())
          fs.writeFileSync(filepath, val)
          const dts = {
            ...line1Obj,
            ...line2Obj,
            filepath
          }
          fields[line1Obj.name] = [Object.entries(dts).reduce((cur, next) => {
            const [key, val] = next
            if (!val) {
              const [key1, val1] = key.split(': ')
              cur[key1] = val1
            } else {
              cur[key] = val
            }
            return cur
          }, {})]
        } else {
          const { name } = querystring.parse(desc, '; ')
          fields[name] = val.toString('utf8')
        }
      })
      const { file } = fields
      const filePaths = path.join(uploadPath, `${+new Date()}.txt`)
      fs.writeFileSync(filePaths, file)
      res.end(filePaths)
    })
})
  .on('close', () => {
    console.log('连接关闭')
  })
  .on('error', () => {
    console.log('出错')
  })

server.listen(3000, () => console.log('服务器启动在端口 3000'))
