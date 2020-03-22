const path = require('path')
const { spawn } = require('child_process')

const child = spawn('node', ['test1.js'], {
  cwd: path.join(__dirname),
  stdio: [process.stdin, process.stdout, 'pipe']
})
child
  .on('close', () => console.log('子进程1关闭'))
  .on('exit', () => console.log('子进程1退出'))
  .on('error', (e) => console.log('子进程1开启失败', e))

const child1 = spawn('node', ['test2.js'], {
  cwd: path.join(__dirname),
  stdio: ['pipe', 'pipe', 'pipe']
})
child1
  .on('close', () => console.log('子进程2关闭'))
  .on('exit', () => console.log('子进程2退出'))
  .on('error', (e) => console.log('子进程2开启失败', e))
