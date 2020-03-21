const http = require('http')
const querystring = require('querystring')

const server = http.createServer()

server
  .on('connection', () => {
    console.log('建立连接成功')
  })
  .on('request', (req, res) => {
    console.log(`${req.method} ${req.url} HTTP/1.1\r\n${Object.entries(req.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n')}`)
    let result = []
    req
      .on('data', data => result.push(data))
      .on('end', () => {
        let r = Buffer.concat(result)
        console.log(`\r\n${r.toString('utf8')}`)
        const contentType = req.headers['content-type']
        switch (contentType) {
          case 'application/x-www-form-urlencoded':
            r = querystring.parse(r)
            break
          case 'application/json':
            r = JSON.parse(r)
            break
          default:
            break
        }
        res.end(typeof r === 'string' ? r : JSON.stringify(r))
      })
  })
  .on('close', () => {
    console.log('连接关闭')
  })
  .on('error', () => {
    console.log('出错')
  })

server.listen(8080, () => console.log('服务器启动成功'))
