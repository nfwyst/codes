const { spawn } = require('child_process')
const path = require('path')

const child = spawn('node', ['test3.js'], {
  cwd: path.join(__dirname),
  stdio: ['ipc', 'ignore', 'ignore']
})

child.on('message', msg => console.log(msg))
child.send('hello')
