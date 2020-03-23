const http = require('http')
const url = require('url')

const server = http.createServer(function (req, res) {
  const refer = req.headers['referer'] || req.headers['refer']
  res.setHeader('Content-Type', 'text/html')
  if (refer) {
    const { hostname: rehost } = url.parse(refer, true)
    const { hostname: ohost } = url.parse(req.url, true)
    if (rehost !== ohost) {
      return res.end('forbidden')
    }
    return res.end('ok')
  }
})

server.listen(8080, () => {
  console.log('server is starting on port 8080')
})
