const express = require('./index')
const app = express()

app
  .get('/hello', (req, res) => {
    res.end('hello')
  })
  .get('/world', (req, res) => {
    res.end('world')
  })
  .listen(8000, () => {
    console.log('server is running on port 8000')
  })
