const express = require('express')
const app = express()

app.get('/test', function (req, res, next) {
  return res.send({
    hello: 'world'
  })
})

app.listen(3000, () => {
  console.log('server started')
});

module.exports = app
