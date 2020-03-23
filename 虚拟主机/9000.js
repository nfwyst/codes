const http = require('http')

http
  .createServer(function (req, res) {
    res.end('from 9000')
  })
  .listen(9000, () => console.log('server is running on port 9000'))
