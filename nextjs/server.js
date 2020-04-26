const next = require('next')
const express = require('express')

const app = next({ dev: false })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('*', (req, res) => {
    handler(req, res)
  })

  server.listen(8000, 'localhost', () => {
    console.log('server started!');
  })
})
