const http = require('http')

http
  .createServer(function (req, res) {
    res.end('from 8000')
  })
  .listen(8000, () => console.log('server is running on port 8000'))
