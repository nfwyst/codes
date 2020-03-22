process.stdout.write('world' + process.argv[2] + '\r\n')

process.on('message', msg => {
  process.send(`子进程: ${msg}`)
  process.exit()
})
