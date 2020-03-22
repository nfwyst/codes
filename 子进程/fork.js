const { spawn } = require('child_process')

const fork = (modulePath, args, options) => {
  let { silent, ...restOptions } = options
  options = restOptions
  if (silent) {
    options.stdio = ['ignore', 'ignore', 'ignore']
  } else {
    options.stdio = [process.stdin, process.stdout, process.stderr]
  }
  return spawn('node', [modulePath, ...args], options)
}

const child = fork('forkTest.js', ['hello'], {
  cwd: __dirname,
  silent: false
})

child.on('message', msg => console.log(msg))
