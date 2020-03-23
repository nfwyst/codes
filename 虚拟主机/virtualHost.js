const http = require('http')
const url = require('url')

const hostMap = {
  'a.com': 8000,
  'b.com': 9000
}

function proxy(req, res, target) {
  const from = url.parse(req.url)
  const to = url.parse(target)
  const { method, headers } = req
  const options = { ...from, ...to, method, headers }
  const request = http.request(options)
  request
    .on('response', resp => resp.pipe(res))
    .on('error', err => res.end(err.message))
  req.pipe(request)
  request.end()
}

http
  .createServer(function (req, res) {
    const { host } = req.headers
    const port = hostMap[host]
    if (!port) {
      res.statusCode = 500
      return res.end()
    }
    return proxy(req, res, `http://localhost:${port}`)
  })
  .listen(80, () => console.log('server is running on port 80'))
