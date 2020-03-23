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
  .use((req, res, next) => {
    console.log(req.url, req.headers)
    next()
  })
  .get('*', (req, res) => {
    res.end('well this is wildcase')
  })
  .listen(8000, () => {
    console.log('server is running on port 8000')
  })
