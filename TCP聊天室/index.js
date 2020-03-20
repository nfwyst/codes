const net = require('net')

class Chat {
  constructor() {
    this.clients = {}
    this.server = net.createServer(this.onSocket.bind(this))
    this.server.listen(8080, 'localhost', () => {
      console.log('服务器成功启动在端口 8080')
    })
  }

  /**
   * 处理客户端的连接
   * @param {object} socket 表示客户端连接的句柄
   */
  onSocket(socket) {
    const key = socket.remoteAddress + socket.remotePort
    socket.write(`欢迎光临本聊天室， 您的地址是: ${key}\r\n`)
    this.clients[key] = {
      nickName: '匿名',
      socket
    }
    socket.setEncoding('utf8')
    socket
      .on('data', this.onData.bind(this, key))
      .on('end', this.onEnd.bind(this, key))
  }

  /**
   * 关闭当前 socket
   * @param {string} key 当前发送消息的用户 key
   */
  onEnd(key) {
    this.clients[key].socket.destroy()
    delete this.clients[key]
  }

  /**
   * 处理客户端的数据
   * @param {string} key 当前发送消息的用户 key
   * @param {string} data 当前用户发送的消息内容
   */
  onData(key, data) {
    data = data.replace(/\r\n/, '')
    const type = data.slice(0, 1)
    switch (type) {
      case 'b': // 广播
        let text = data.slice(2)
        this.broadcast(text, key)
        break
      case 'c': // 私聊
        const [_, toUser, text1] = data.split(':')
        this.sendTo(toUser, text1, key)
        break
      case 'l': // 列出当前的用户列表
        this.list(key)
        break
      case 'n': // 修改昵称
        let text2 = data.slice(2)
        this.rename(key, text2)
        break
      default:
        this.clients[key].socket.write('此命令不能识别， 请重新输入\r\n')
    }
  }

  /**
   * 获取在线用户列表
   * @param {string} key 当前发送消息的用户 key
   */
  list(key) {
    let result = '在线用户列表: \r\n'
    for (let user in this.clients) {
      if (this.clients.hasOwnProperty(user)) {
        result += `${this.clients[user].nickName}\r\n`
      }
    }
    const { socket } = this.clients[key]
    socket.write(result)
  }

  /**
   * 修改昵称
   * @param {string} key 当前发送消息的用户 key
   * @param {string} text 新昵称
   */
  rename(key, text) {
    this.clients[key].nickName = text
    this.clients[key].socket.write(`你的用户名已经修改为: ${text}\r\n`)
  }

  /**
   * 发送消息
   * @param {string} username 向谁发送信息
   * @param {string} content 发送的消息内容
   * @param {string} key 当前发送消息的用户 key
   */
  sendTo(username, content, key) {
    const { nickName: curUserName, socket: curSocket } = this.clients[key]
    let find = false
    for (let user in this.clients) {
      if (this.clients.hasOwnProperty(user)) {
        const { nickName, socket } = this.clients[user]
        if (nickName === username) {
          find = true
          socket.write(`${curUserName}:${content}\r\n`)
          break
        }
      }
    }
    if (!find) {
      curSocket.write('用户名不正确， 或者对方已经下线\r\n')
    }
  }

  /**
   * 广播
   * @param {string} text 广播的内容
   * @param {string} key 当前广播的用户 key
   */
  broadcast(text, key) {
    const { nickName } = this.clients[key]
    for (let user in this.clients) {
      if (this.clients.hasOwnProperty(user) && user !== key) {
        this.clients[user].socket.write(`${nickName}:${text}\r\n`)
      }
    }
  }
}

new Chat()

module.exports = Chat
