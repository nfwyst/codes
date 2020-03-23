const http = require('http')
const proxy = require('http-proxy')

const server = http.createServer(function (req, res) {
  proxy.createProxyServer().web(req, res, {
    target: 'http://localhost:8000'
  })
})

server.listen(9000, () => {
  console.log('proxy server is running on port 9000')
})
