const http = require('http')
const { fork } = require('child_process')
const os = require('os')

const server = http
  .createServer(function (req, res) {
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end('请求在父进程中被处理')
  })
  .listen(8080, () => console.log('父进程启动'))

const cpus = os.cpus()
cpus.shift()
const childs = cpus.map(c => fork('server.js', [], {
  cwd: __dirname
}))
childs.map((child, index) => child.send(`server-${index}`, server))
