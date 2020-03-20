const dgram = require('dgram')

class UdpClient {
  constructor() {
    this.server = dgram.createSocket('udp4')
    this.server.send(Buffer.from('hello'), 0, 6, 41234, 'localhost', this.onSuccess.bind(this))
    this.server.on('message', this.onMessage.bind(this))
  }

  onSuccess(...args) {
    console.log(...args)
  }

  onMessage(msg, rinfo) {
    console.log(msg.toString())
  }
}

module.exports = UdpClient
