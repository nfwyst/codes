const dgram = require('dgram')

class UdpServer {
  constructor() {
    this.server = dgram.createSocket('udp4')
    // 在本机的 41234 端口上监听消息
    this.server.bind(41234, 'localhost')
    this.server.on('message', this.onMessage.bind(this))

  }

  /**
   * 监听另一方发送的消息
   * @param {string} msg 消息内容
   * @param {rinfo}
   */
  onMessage(msg, rinfo) {
    this.server.send(Buffer.from(msg), 0, msg.length, rinfo.port, rinfo.address)
  }
}

module.exports = UdpServer
