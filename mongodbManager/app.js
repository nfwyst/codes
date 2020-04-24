const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./controllers')

// 请求body解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 业务逻辑绑定
routes(app)

// 连接数据库
// mongodb://<user>:<pwd>@<host>:<port>/<database>
const mongoURL = 'mongodb://localhost:27877/demo'
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// 监听连接事件
db.on('error', console.error.bind(console, 'MongoDb连接异常: '))

app.listen(3000, () => {
  console.log('应用已经启动在端口3000之上')
});

module.exports = app
