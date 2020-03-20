const dgram = require('dgram')

class UdpClient {
  constructor() {
    this.server = dgram.createSocket('udp4')
    this.server.bind(41235, 'localhost')
    this.server.send(Buffer.from('hello'), 0, 6, 41234, 'localhost', this.onSuccess.bind(this))
    this.server.on('message', this.onMessage.bind(this))
  }

  /**
   * 发送消息成功
   */
  onSuccess(...args) {
    console.log(...args)
  }

  /**
   * 监听另一方发送的消息
   * @param {string} msg 消息内容
   * @param {rinfo}
   */
  onMessage(msg, rinfo) {
    console.log(msg.toString())
  }
}

module.exports = UdpClient
