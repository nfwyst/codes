const express = require('./index')
const app = express()

app
  .get('/hello', (req, res) => {
    res.end('hello\r\n')
  })
  .get('/world', (req, res) => {
    res.end('world\r\n')
  })
  .post('/world', (req, res) => {
    res.end('post world\r\n')
  })
  .all('/all', (req, res) => {
    res.end('this is all\r\n')
  })
  .listen(8000, () => {
    console.log('server is running on port 8000')
  })
