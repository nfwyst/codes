const path = require('path')

module.exports = {
  host: 'localhost', // 监听的主机
  port: 8080, // 监听的端口号
  root: path.resolve(__dirname, '../public') // 配置静态文件根目录
}
