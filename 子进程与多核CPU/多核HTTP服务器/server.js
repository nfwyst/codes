const http = require('http')

process.on('message', (msg, server) => {
  if (msg.startsWith('server')) {
    http
      .createServer(function (req, res) {
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(`请求在子进程 ${msg} 中被处理`)
      })
      .listen(server, () => {
        console.log(`子进程 ${msg} 启动`)
      })
  }
})
