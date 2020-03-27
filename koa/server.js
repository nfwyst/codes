const http = require('http')

const port = 9300
let server = http.createServer((req, res) => {
  res.end('hello http')
})

server.listen(port, () => {
  console.log(`${port} is running`)
})
