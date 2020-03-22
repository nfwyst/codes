process.on('message', msg => {
  process.send(`test3: ${msg}`)
})
