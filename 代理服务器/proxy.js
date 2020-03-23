const http = require('http')
const url = require('url')

class WebProxy {
  constructor({ target }) {
    this.target = target
  }

  web(req, res) {
    const from = url.parse(req.url)
    const to = url.parse(this.target)
    const { method, headers } = req
    const options = { ...from, ...to, method, headers }
    const request = http.request(options)
    request
      .on('response', resp => resp.pipe(res))
      .on('error', err => res.end(err.message))
    req.pipe(request)
    request.end()
  }
}

const proxy = new WebProxy({ target: 'http://localhost:8000' })

http
  .createServer((req, res) => proxy.web(req, res))
  .listen(9000, () => {
    console.log('proxy server is running on port 9000')
  })
